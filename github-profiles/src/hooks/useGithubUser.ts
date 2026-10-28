import { useEffect, useState } from "react";
import type { GitHubRepo, GitHubUser } from "@/types/github";

const API_URL = "https://api.github.com/users/";

interface State {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGithubUser(username: string): State {
  const [state, setState] = useState<State>({
    user: null,
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(API_URL + encodeURIComponent(username), { signal: controller.signal }),
          fetch(API_URL + encodeURIComponent(username) + "/repos?per_page=100", {
            signal: controller.signal,
          }),
        ]);

        if (userRes.status === 404) throw new Error(`No GitHub user named "${username}".`);
        if (userRes.status === 403)
          throw new Error("GitHub rate limit reached. Please try again in a few minutes.");
        if (!userRes.ok || !reposRes.ok) throw new Error("Something went wrong. Please try again.");

        const user: GitHubUser = await userRes.json();
        const repos: GitHubRepo[] = await reposRes.json();

        setState({ user, repos, loading: false, error: null });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({
          user: null,
          repos: [],
          loading: false,
          error: err instanceof Error ? err.message : "Something went wrong.",
        });
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return state;
}
