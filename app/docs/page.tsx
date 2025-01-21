"use client";

import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Documentation</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Documentation is coming soon. Check back later for detailed guides and API references.
          </p>
        </div>
      </div>
    </div>
  );
}