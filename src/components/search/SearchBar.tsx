
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        placeholder="Search fresh produce..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full bg-white/95 backdrop-blur-sm"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
}
