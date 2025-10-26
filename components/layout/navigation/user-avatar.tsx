import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/validations/users";

interface UserAvatarProps {
  user: User | { name: string; profilePictureUrl?: string; mood?: string };
  className?: string;
};

export function UserAvatar({ user, className }: UserAvatarProps) {
  const displayName = user.name || "?";
  const displayPicture =
    "profilePictureUrl" in user ? user.profilePictureUrl : undefined;
  const displayMood = "mood" in user ? user.mood : undefined;

  // Generate initials from name
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <Avatar className={className}>
        {displayPicture && (
          <AvatarImage src={displayPicture} alt={displayName} />
        )}
        <AvatarFallback className="bg-secondary">{initials}</AvatarFallback>
      </Avatar>
      {displayMood && (
        <div className="absolute -bottom-1 -right-1 text-xs rounded-full p-0.5 border border-border">
          {displayMood}
        </div>
      )}
    </div>
  );
}
