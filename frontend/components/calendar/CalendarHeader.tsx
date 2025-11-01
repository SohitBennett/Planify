// 'use client';

// import { ChevronLeft, ChevronRight, Plus, Settings, Search, Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ViewType } from '@/types';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { format } from 'date-fns';

// interface CalendarHeaderProps {
//   currentDate: Date;
//   viewType: ViewType;
//   onDateChange: (date: Date) => void;
//   onViewChange: (view: ViewType) => void;
//   onCreateEvent: () => void;
//   onLogout: () => void;
//   userName: string;
// }

// export default function CalendarHeader({
//   currentDate,
//   viewType,
//   onDateChange,
//   onViewChange,
//   onCreateEvent,
//   onLogout,
//   userName,
// }: CalendarHeaderProps) {
//   const goToPrevious = () => {
//     const newDate = new Date(currentDate);
//     if (viewType === 'month') {
//       newDate.setMonth(newDate.getMonth() - 1);
//     } else if (viewType === 'week') {
//       newDate.setDate(newDate.getDate() - 7);
//     } else {
//       newDate.setDate(newDate.getDate() - 1);
//     }
//     onDateChange(newDate);
//   };

//   const goToNext = () => {
//     const newDate = new Date(currentDate);
//     if (viewType === 'month') {
//       newDate.setMonth(newDate.getMonth() + 1);
//     } else if (viewType === 'week') {
//       newDate.setDate(newDate.getDate() + 7);
//     } else {
//       newDate.setDate(newDate.getDate() + 1);
//     }
//     onDateChange(newDate);
//   };

//   const goToToday = () => {
//     onDateChange(new Date());
//   };

//   const getDateDisplay = () => {
//     if (viewType === 'month') {
//       return format(currentDate, 'MMMM yyyy');
//     } else if (viewType === 'week') {
//       return format(currentDate, 'MMMM yyyy');
//     } else {
//       return format(currentDate, 'MMMM d, yyyy');
//     }
//   };

//   return (
//     <header className="border-b bg-white px-4 py-3">
//       <div className="flex items-center justify-between">
//         {/* Left section */}
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" className="md:hidden">
//             <Menu className="h-5 w-5" />
//           </Button>
          
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
//               <span className="text-xl">📅</span>
//             </div>
//             <h1 className="text-xl font-semibold text-gray-700 hidden md:block">Planify</h1>
//           </div>

//           <Button
//             variant="outline"
//             onClick={goToToday}
//             className="hidden md:inline-flex"
//           >
//             Today
//           </Button>

//           <div className="flex items-center gap-1">
//             <Button variant="ghost" size="icon" onClick={goToPrevious}>
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={goToNext}>
//               <ChevronRight className="h-5 w-5" />
//             </Button>
//           </div>

//           <h2 className="text-xl font-normal text-gray-800 min-w-[200px]">
//             {getDateDisplay()}
//           </h2>
//         </div>

//         {/* Right section */}
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="hidden md:inline-flex">
//             <Search className="h-5 w-5" />
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="hidden md:inline-flex">
//                 {viewType === 'month' && 'Month'}
//                 {viewType === 'week' && 'Week'}
//                 {viewType === 'day' && 'Day'}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => onViewChange('day')}>
//                 Day
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => onViewChange('week')}>
//                 Week
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => onViewChange('month')}>
//                 Month
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button onClick={onCreateEvent} className="gap-2">
//             <Plus className="h-4 w-4" />
//             <span className="hidden md:inline">Create</span>
//           </Button>

//           <Button variant="ghost" size="icon" className="hidden md:inline-flex">
//             <Settings className="h-5 w-5" />
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon" className="rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-blue-500 text-white">
//                     {userName.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem disabled>
//                 {userName}
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={onLogout}>
//                 Sign out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }




'use client';

import { ChevronLeft, ChevronRight, Plus, Settings, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewType } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: ViewType;
  onDateChange: (date: Date) => void;
  onViewChange: (view: ViewType) => void;
  onCreateEvent: () => void;
  onLogout: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
  userName: string;
}

export default function CalendarHeader({
  currentDate,
  viewType,
  onDateChange,
  onViewChange,
  onCreateEvent,
  onLogout,
  onOpenSearch,
  onOpenSettings,
  onToggleSidebar,
  userName,
}: CalendarHeaderProps) {
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'year') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'year') {
      newDate.setFullYear(newDate.getFullYear() + 1);
    } else if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const getDateDisplay = () => {
    if (viewType === 'year') {
      return format(currentDate, 'yyyy');
    } else if (viewType === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else if (viewType === 'week') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      return format(currentDate, 'MMMM d, yyyy');
    }
  };

  return (
    <header className="border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border">
              <span className="text-xl"></span>
            </div> */}
            <img 
                src="/logo_small.png" 
                alt="Planify Logo" 
                className="w-10 h-10 rounded-md  object-contain" 
            />
            <h1 className="text-xl font-semibold text-foreground hidden md:block">Planify</h1>
          </div>

          <Button
            variant="outline"
            onClick={goToToday}
            className="hidden md:inline-flex"
          >
            Today
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <h2 className="text-xl font-normal text-foreground min-w-[200px]">
            {getDateDisplay()}
          </h2>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenSearch}>
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:inline-flex">
                {viewType === 'month' && 'Month'}
                {viewType === 'week' && 'Week'}
                {viewType === 'day' && 'Day'}
                {viewType === 'year' && 'Year'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewChange('day')}>
                Day
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('week')}>
                Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('month')}>
                Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('year')}>
                Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={onCreateEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Create</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={onOpenSettings}>
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {userName}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}