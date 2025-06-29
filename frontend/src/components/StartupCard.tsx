import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, ArrowRight } from 'lucide-react';

interface StartupCardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  category?: string;
  eco?: boolean;
}

export function StartupCard({
  imageUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=250&fit=crop",
  title = "EcoThreads",
  description = "Sustainable fashion made from recycled materials",
  category = "Fashion",
  eco = true,
}: StartupCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full max-w-xs mx-auto flex flex-col overflow-hidden">
      <div className="relative mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-xl"
        />
        {eco && (
          <div className="absolute top-3 right-3 bg-green-100 p-2 rounded-full shadow">
            <Leaf className="w-5 h-5 text-green-600" aria-label="Eco-friendly" />
          </div>
        )}
      </div>
      <Badge className="mb-3 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{category}</Badge>
      <h3 className="font-bold text-xl text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <Button
        variant="outline"
        className="w-full mt-auto flex items-center justify-center gap-2 font-semibold text-base border-gray-200 py-3"
      >
        View Startup
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
