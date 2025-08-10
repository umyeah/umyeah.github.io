import React from 'react';
import { motion, useInView } from 'framer-motion';
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
  index: number;
}

const ResumeTimelineItem: React.FC<ResumeTimelineItemProps> = ({ event, isFirst, isLast, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

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

  // Determine slide direction based on index (odd/even)
  const isOdd = index % 2 === 1;
  const slideX = isOdd ? -400 : 400; // Odd slides from left, even slides from right (using large fixed values for SSR compatibility)

  return (
    <motion.div 
      ref={ref}
      className={`timeline-item ${isFirst ? 'timeline-item--first' : ''} ${isLast ? 'timeline-item--last' : ''}`}
      initial={{ opacity: 0, x: slideX, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: slideX, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="timeline-connector">
        <motion.div 
          className="company-avatar"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        >
          <span className="company-avatar__initials">
            {getCompanyInitials(event.company)}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div 
            className="timeline-line"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            style={{ originY: 0 }}
          ></motion.div>
        )}
      </div>
      
      <motion.div 
        className="content-card"
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <div className="content-card__header">
          <div className="content-card__title-section">
            <motion.h3 
              className="job-title"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {event.title}
            </motion.h3>
            <motion.div 
              className="company-info"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <span className="company-name">{event.company}</span>
              <span className="company-location">{event.location}</span>
            </motion.div>
          </div>
          <motion.div 
            className="date-range"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {formatDateRange(event.startDate, event.endDate)}
          </motion.div>
        </div>
        
        <motion.div 
          className="description"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {event.description.split('\n\n').map((paragraph, index) => {
            // Check if this paragraph starts with a position title
            const positionMatch = paragraph.match(/^([^:]+):/);
            if (positionMatch) {
              const [fullMatch, positionTitle] = positionMatch;
              const description = paragraph.substring(fullMatch.length).trim();
              return (
                <motion.div 
                  key={index} 
                  className="position-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                >
                  <h4 className="position-title">{positionTitle}</h4>
                  <p className="position-description">{description}</p>
                </motion.div>
              );
            } else {
              return (
                <motion.p 
                  key={index} 
                  className="position-description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                >
                  {paragraph}
                </motion.p>
              );
            }
          })}
        </motion.div>
      </motion.div>
    </motion.div>
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
            index={index}
            isFirst={index === 0}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTimeline;
