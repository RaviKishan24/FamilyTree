import React from "react";
import { useLocation } from "react-router-dom";
import Placeholder from "../Components/Placeholder";

const IN_PROGRESS_ROUTES = {
  "/gallery": {
    title: "Gallery Coming Soon",
    message:
      "We're building a beautiful gallery for family photos and memories. Check back soon!",
  },
  "/members": {
    title: "Members Directory Coming Soon",
    message:
      "A searchable directory of all family members is on the way.",
  },
  "/events": {
    title: "Events Calendar Coming Soon",
    message:
      "Track birthdays, anniversaries, and family reunions all in one place.",
  },
  "/stories": {
    title: "Family Stories Coming Soon",
    message:
      "Preserve the stories behind the names — a storytelling feature is in the works.",
  },
  "/settings": {
    title: "Settings Coming Soon",
    message:
      "Account and privacy settings are being redesigned for a better experience.",
  },
  "/profile": {
    title: "Profile Page Coming Soon",
    message:
      "Your personal profile page is under construction. Check back soon!",
  },
};

function PageHandler() {
  const location = useLocation();
  const path = location.pathname;

  const inProgress = IN_PROGRESS_ROUTES[path];

  if (inProgress) {
    return (
      <Placeholder
        variant="inprogress"
        title={inProgress.title}
        message={inProgress.message}
        showProgress
      />
    );
  }

  return <Placeholder variant="notfound" />;
}

export default PageHandler;