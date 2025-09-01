import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music, MicOff } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";

interface AudioControlsProps {
  onToggleContrast: () => void;
  isHighContrast: boolean;
}

export function AudioControls({ onToggleContrast, isHighContrast }: AudioControlsProps) {
  const { isPlaying, isMuted, toggleAudio, toggleMute } = useAudio();

  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={toggleAudio}
        variant="ghost"
        size="icon"
        className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
        title={isPlaying ? "Stop ambient music" : "Play ambient music"}
        data-testid="audio-toggle"
      >
        {isPlaying ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </Button>

      <Button
        onClick={toggleMute}
        variant="ghost"
        size="icon"
        className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
        data-testid="mute-toggle"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </Button>

      <Button
        onClick={onToggleContrast}
        variant="ghost"
        size="icon"
        className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
        title={isHighContrast ? "Disable high contrast" : "Enable high contrast"}
        data-testid="contrast-toggle"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </Button>
    </div>
  );
}
