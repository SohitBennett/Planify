'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  const [weekStartDay, setWeekStartDay] = useState('0'); // 0 = Sunday
  const [showHolidays, setShowHolidays] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedWeekStart = localStorage.getItem('weekStartDay') || '0';
    const savedShowHolidays = localStorage.getItem('showHolidays') !== 'false';
    setWeekStartDay(savedWeekStart);
    setShowHolidays(savedShowHolidays);
  }, []);

  const handleWeekStartChange = (value: string) => {
    setWeekStartDay(value);
    localStorage.setItem('weekStartDay', value);
  };

  const handleShowHolidaysChange = (checked: boolean) => {
    setShowHolidays(checked);
    localStorage.setItem('showHolidays', checked.toString());
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Setting */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Appearance</Label>
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors ${
                  theme === 'light' ? 'border-primary bg-accent' : ''
                }`}
                onClick={() => setTheme('light')}
              >
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5" />
                  <span>Light</span>
                </div>
                {theme === 'light' && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors ${
                  theme === 'dark' ? 'border-primary bg-accent' : ''
                }`}
                onClick={() => setTheme('dark')}
              >
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5" />
                  <span>Dark</span>
                </div>
                {theme === 'dark' && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors ${
                  theme === 'system' ? 'border-primary bg-accent' : ''
                }`}
                onClick={() => setTheme('system')}
              >
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5" />
                  <span>System</span>
                </div>
                {theme === 'system' && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            </div>
          </div>

          {/* Week Start Day */}
          <div className="space-y-2">
            <Label htmlFor="weekStart" className="text-base font-semibold">
              Week starts on
            </Label>
            <Select value={weekStartDay} onValueChange={handleWeekStartChange}>
              <SelectTrigger id="weekStart">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Sunday</SelectItem>
                <SelectItem value="1">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show Holidays */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="holidays" className="text-base font-semibold">
                Show Indian Holidays
              </Label>
              <p className="text-sm text-muted-foreground">
                Display national holidays in calendar
              </p>
            </div>
            <Switch
              id="holidays"
              checked={showHolidays}
              onCheckedChange={handleShowHolidaysChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}