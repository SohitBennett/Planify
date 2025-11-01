'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Event } from '@/types';
import { format, parseISO } from 'date-fns';
import { Search, Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function SearchDialog({ isOpen, onClose, events, onEventClick }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEvents([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = events.filter(event => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    });

    // Sort by date
    filtered.sort((a, b) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleEventClick = (event: Event) => {
    onEventClick(event);
    onClose();
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center gap-2 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {searchQuery && filteredEvents.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No events found</p>
            </div>
          )}

          {!searchQuery && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Search for events by title, description, or location</p>
            </div>
          )}

          {filteredEvents.map((event) => {
            const startDate = parseISO(event.start);
            const endDate = parseISO(event.end);

            return (
              <div
                key={event._id}
                className="p-4 hover:bg-accent cursor-pointer transition-colors border-b last:border-b-0"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 h-full rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: event.color, minHeight: '40px' }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{event.title}</h4>
                    
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(startDate, 'MMM d, yyyy')}</span>
                      </div>
                      
                      {!event.allDay && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                          </span>
                        </div>
                      )}
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}

                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}