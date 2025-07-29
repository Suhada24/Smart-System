/**
 * Smart University LMS - Calendar Component
 * A reusable calendar component for displaying events and scheduling
 */

class SchoolCalendar {
    constructor() {
        this.calendarEl = document.createElement('div');
        this.calendarEl.className = 'school-calendar';
        this.events = [];
        this.currentDate = new Date();
        this.init();
    }

    init() {
        this.render();
    }
    
    render() {
        // Clear previous calendar
        this.calendarEl.innerHTML = '';
        
        // Create calendar header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        const monthYear = document.createElement('h3');
        monthYear.textContent = this.formatMonthYear(this.currentDate);
        header.appendChild(monthYear);
        
        this.calendarEl.appendChild(header);
        
        // Create weekday headers
        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = 'calendar-weekdays';
        
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-weekday';
            dayEl.textContent = day;
            weekdaysRow.appendChild(dayEl);
        });
        
        this.calendarEl.appendChild(weekdaysRow);
        
        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Get first day of month and total days
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 = Sunday
        
        // Create day cells
        const totalCells = 42; // 6 rows x 7 days
        
        for (let i = 0; i < totalCells; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const dayNumber = i - startingDay + 1;
            
            if (i >= startingDay && i < startingDay + totalDays) {
                // Valid day in current month
                dayCell.textContent = dayNumber;
                
                // Check if current day
                const currentDay = new Date();
                if (dayNumber === currentDay.getDate() && 
                    month === currentDay.getMonth() && 
                    year === currentDay.getFullYear()) {
                    dayCell.classList.add('today');
                }
                
                // Check for events on this day
                const eventsForDay = this.getEventsForDay(year, month, dayNumber);
                if (eventsForDay.length > 0) {
                    dayCell.classList.add('has-events');
                    
                    // Add event indicators
                    const eventIndicators = document.createElement('div');
                    eventIndicators.className = 'event-indicators';
                    
                    eventsForDay.forEach(event => {
                        const indicator = document.createElement('div');
                        indicator.className = `event-indicator ${event.type || 'default'}`;
                        eventIndicators.appendChild(indicator);
                        
                        // Add tooltip with event title
                        dayCell.setAttribute('title', event.title);
                    });
                    
                    dayCell.appendChild(eventIndicators);
                }
                
                // Add click handler to view/add events
                dayCell.addEventListener('click', () => {
                    this.onDayClick(year, month, dayNumber);
                });
            } else {
                // Day is not part of current month
                dayCell.classList.add('inactive');
                
                if (i < startingDay) {
                    // Previous month
                    const prevMonthDays = new Date(year, month, 0).getDate();
                    dayCell.textContent = prevMonthDays - (startingDay - i) + 1;
                } else {
                    // Next month
                    dayCell.textContent = i - (startingDay + totalDays) + 1;
                }
            }
            
            calendarGrid.appendChild(dayCell);
        }
        
        this.calendarEl.appendChild(calendarGrid);
    }
    
    formatMonthYear(date) {
        const months = [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }
    
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }
    
    getEventsForDay(year, month, day) {
        // Filter events that match the given date
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day
            );
        });
    }
    
    addEvent(event) {
        this.events.push(event);
        this.render(); // Re-render to show new event
        return event;
    }
    
    onDayClick(year, month, day) {
        // Show events for this day or open add event modal
        const date = new Date(year, month, day);
        const eventsForDay = this.getEventsForDay(year, month, day);
        
        // For demonstration purposes, just log events
        console.log(`Events for ${date.toDateString()}:`, eventsForDay);
        
        // If there's a callback defined, call it
        if (typeof this.options?.onDayClick === 'function') {
            this.options.onDayClick(date, eventsForDay);
        }
    }
    
    // Load events from API or localStorage
    loadEvents(events) {
        this.events = events;
        this.render();
    }
}

/**
 * Opens a modal to add an event to the calendar
 */
function openAddEventModal() {
    // Create a modal to add a new event
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'addEventModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Event</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="addEventForm">
                    <div class="form-group">
                        <label for="eventTitle">Event Title</label>
                        <input type="text" id="eventTitle" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="eventDate">Date</label>
                        <input type="date" id="eventDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="eventType">Event Type</label>
                        <select id="eventType" class="form-control">
                            <option value="default">Default</option>
                            <option value="assignment">Assignment</option>
                            <option value="exam">Exam</option>
                            <option value="meeting">Meeting</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="eventDescription">Description</label>
                        <textarea id="eventDescription" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelEvent">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('#cancelEvent');
    const form = modal.querySelector('#addEventForm');
    
    // Close modal function
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventType = document.getElementById('eventType').value;
        const eventDescription = document.getElementById('eventDescription').value;
        
        // Get calendar instance (this is simplistic - in a real app, you'd use a more robust method)
        const calendarContainer = document.getElementById('calendarContainer');
        if (calendarContainer && calendarContainer.firstChild && calendarContainer.firstChild._calendar) {
            const calendar = calendarContainer.firstChild._calendar;
            
            // Add the event
            calendar.addEvent({
                title: eventTitle,
                date: new Date(eventDate),
                type: eventType,
                description: eventDescription
            });
            
            // Show success toast if available
            if (typeof showToast === 'function') {
                showToast('Event added successfully', 'success');
            }
        } else {
            // Show error toast if available
            if (typeof showToast === 'function') {
                showToast('Could not add event to calendar', 'error');
            } else {
                console.error('Could not add event to calendar');
            }
        }
        
        closeModal();
    });
}

// Additional CSS for calendar
document.head.insertAdjacentHTML('beforeend', `
<style>
.school-calendar {
    width: 100%;
    background: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
}

.calendar-header {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--border-color);
}

.calendar-weekday {
    padding: 10px;
    text-align: center;
    font-weight: 600;
    color: var(--text-secondary);
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    min-height: 300px;
}

.calendar-day {
    padding: 10px;
    text-align: center;
    position: relative;
    min-height: 60px;
    cursor: pointer;
    transition: background 0.3s ease;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
}

.calendar-day:hover {
    background: var(--hover-color);
}

.calendar-day.today {
    background: rgba(33, 150, 243, 0.1);
    font-weight: 600;
    color: var(--secondary-color);
}

.calendar-day.inactive {
    color: var(--text-secondary);
    opacity: 0.5;
}

.calendar-day.has-events {
    font-weight: 600;
}

.event-indicators {
    display: flex;
    gap: 2px;
    justify-content: center;
    margin-top: 5px;
}

.event-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--primary-color);
}

.event-indicator.assignment {
    background-color: #ff9800;
}

.event-indicator.exam {
    background-color: #f44336;
}

.event-indicator.meeting {
    background-color: #4caf50;
}

@media (max-width: 768px) {
    .calendar-day {
        min-height: 40px;
        padding: 5px;
        font-size: 0.8rem;
    }
}
</style>
`);