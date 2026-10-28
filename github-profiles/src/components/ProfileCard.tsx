import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubRepo, GitHubUser } from "@/types/github";

interface ProfileCardProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export default function ProfileCard({ user, repos }: ProfileCardProps) {
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10);

  const stats = [
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
    { label: "Repos", value: user.public_repos },
  ];

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
        <Avatar className="h-36 w-36 border-8 border-background">
          <AvatarImage src={user.avatar_url} alt={user.name ?? user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <CardTitle>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="hover:underline">
              {user.name ?? user.login}
            </a>
          </CardTitle>
          <CardDescription className="text-base">{user.bio ?? "No bio available."}</CardDescription>

          {user.location && (
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground sm:justify-start">
              <MapPin className="h-4 w-4" />
              {user.location}
            </p>
          )}

          <ul className="flex justify-center gap-6 sm:justify-start">
            {stats.map((stat) => (
              <li key={stat.label} className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">{stat.value.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Top repositories
        </h3>
        {topRepos.length === 0 ? (
          <p className="text-sm text-muted-foreground">No public repositories.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {topRepos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer">
                <Badge variant="secondary">{repo.name}</Badge>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
