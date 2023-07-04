import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type UserProps = {
  id: string;
  email: string;
  name: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <small>{user.email}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
          border: 1px solid;
          border-radius: 5px;
          box-shadow: 2px 1px 4px;

        }
      `}</style>
    </div>
  );
};

export default User;
