import React from "react";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";
import {ReactComponent as TODO} from "../assets/To-do.svg"
import {ReactComponent as InProgress} from "../assets/in-progress.svg"
import {ReactComponent as DONE} from "../assets/Done.svg"
import {ReactComponent as CANCELLED} from "../assets/Cancelled.svg"

const KanbanBoard = ({ groupedTickets, users, sortBy }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
        return <TODO />;
      case "in progress":
        return <InProgress />;
      case "done":
        return <DONE />;
      case "canceled":
        return <CANCELLED />;
      default:
        return "○";
    }
  };

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="kanban-column">
          <h2
            className={`column-title ${group.toLowerCase().replace(" ", "-")}`}
          >
            {getStatusIcon(group)} {group}
            <span className="ticket-count">{tickets.length}</span>
          </h2>
          <div className="ticket-group">
            {tickets.map((ticket) => {
              const user = users.find((u) => u.id === ticket.userId);
              return <TicketCard key={ticket.id} ticket={ticket} user={user} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
