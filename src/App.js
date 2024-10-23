import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedGroupBy = localStorage.getItem("groupBy");
    const savedSortBy = localStorage.getItem("sortBy");
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const groupTickets = () => {
    let grouped = {};

    switch (groupBy) {
      case "status":
        grouped = tickets.reduce((groups, ticket) => {
          const status = ticket.status;
          if (!groups[status]) {
            groups[status] = [];
          }
          groups[status].push(ticket);
          return groups;
        }, {});
        break;

      case "user":
        grouped = tickets.reduce((groups, ticket) => {
          const user =
            users.find((u) => u.id === ticket.userId)?.name || "Unknown";
          if (!groups[user]) {
            groups[user] = [];
          }
          groups[user].push(ticket);
          return groups;
        }, {});
        break;

      case "priority":
        grouped = tickets.reduce((groups, ticket) => {
          const priorityMap = {
            4: "Urgent",
            3: "High",
            2: "Medium",
            1: "Low",
            0: "No priority",
          };
          const priority = priorityMap[ticket.priority] || "No priority";
          if (!groups[priority]) {
            groups[priority] = [];
          }
          groups[priority].push(ticket);
          return groups;
        }, {});
        break;

      default:
        grouped = tickets;
    }

    Object.keys(grouped).forEach((key) => {
      grouped[key] = sortTickets(grouped[key]);
    });

    return grouped;
  };

  const sortTickets = (ticketsToSort) => {
    return [...ticketsToSort].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <div className="app">
      <Controls
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <KanbanBoard
        groupedTickets={groupTickets()}
        users={users}
        sortBy={sortBy}
      />
    </div>
  );
};

export default App;
