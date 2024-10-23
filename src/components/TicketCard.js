import React from "react";
import "./TicketCard.css"

const TicketCard = ({ ticket, user }) => {
  const priorityMap = {
    4: { label: "Urgent", className: "priority-high" },
    3: { label: "High", className: "priority-high" },
    2: { label: "Medium", className: "priority-medium" },
    1: { label: "Low", className: "priority-low" },
    0: { label: "No priority", className: "priority-no" },
  };

  return (
    <div className="ticket-card">
      <h3 className="ticket-id">{ticket.id}</h3>
      <h3 className="ticket-title">{ticket.title}</h3>
      <p className={priorityMap[ticket.priority].className}>
        <strong>Priority:</strong> {priorityMap[ticket.priority].label}
      </p>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Assigned to:</strong> {user ? user.name : "Unknown"}
      </p>
    </div>
  );
};

export default TicketCard;
