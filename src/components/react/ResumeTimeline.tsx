import React from 'react';
import { resumeEvents, type ResumeEvent } from '../../data/resumeEvents';
import './ResumeTimeline.css';

interface ResumeTimelineProps {
  events?: ResumeEvent[];
  className?: string;
}

interface ResumeTimelineItemProps {
  event: ResumeEvent;
  isFirst: boolean;
  isLast: boolean;
}

const ResumeTimelineItem: React.FC<ResumeTimelineItemProps> = ({ event, isFirst, isLast }) => {
  const formatDateRange = (startDate: string, endDate: string | null) => {
    const formatDate = (dateString: string) => {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div className={`timeline-item ${isFirst ? 'timeline-item--first' : ''} ${isLast ? 'timeline-item--last' : ''}`}>
      <div className="timeline-connector">
        <div className="company-avatar">
          <span className="company-avatar__initials">
            {getCompanyInitials(event.company)}
          </span>
        </div>
        {!isLast && <div className="timeline-line"></div>}
      </div>
      
      <div className="content-card">
        <div className="content-card__header">
          <div className="content-card__title-section">
            <h3 className="job-title">{event.title}</h3>
            <div className="company-info">
              <span className="company-name">{event.company}</span>
              <span className="company-location">{event.location}</span>
            </div>
          </div>
          <div className="date-range">
            {formatDateRange(event.startDate, event.endDate)}
          </div>
        </div>
        
        <div className="description">
          {event.description.split('\n\n').map((paragraph, index) => {
            // Check if this paragraph starts with a position title
            const positionMatch = paragraph.match(/^([^:]+):/);
            if (positionMatch) {
              const [fullMatch, positionTitle] = positionMatch;
              const description = paragraph.substring(fullMatch.length).trim();
              return (
                <div key={index} className="position-section">
                  <h4 className="position-title">{positionTitle}</h4>
                  <p className="position-description">{description}</p>
                </div>
              );
            } else {
              return <p key={index} className="position-description">{paragraph}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const ResumeTimeline: React.FC<ResumeTimelineProps> = ({ 
  events = resumeEvents, 
  className = '' 
}) => {
  return (
    <div className={`resume-timeline ${className}`}>
      <div className="resume-timeline__header">
        <h1>Professional Journey</h1>
        <p>A timeline of my career and educational milestones</p>
        <p>This was just a prototype. Don't judge me on the AI descriptions 😂</p>
      </div>
      
      <div className="resume-timeline__container">
        {events.map((event, index) => (
          <ResumeTimelineItem
            key={event.id}
            event={event}
            isFirst={index === 0}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTimeline;
