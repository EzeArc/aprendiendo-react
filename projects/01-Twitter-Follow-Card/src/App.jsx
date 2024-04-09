import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  {
    userName: "midudev",
    name: "Miguel Ángel Durán",
    isFollowing: true,
  },
  {
    userName: "Github",
    name: "Github",
    isFollowing: false,
  },
  {
    userName: "Goku",
    name: "Goku",
    isFollowing: true,
  },
  {
    userName: "lionelmessi",
    name: "Lionel Messi",
    isFollowing: true,
  },
  {
    userName: "Bender",
    name: "Bender Rodriguez",
    isFollowing: false,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
