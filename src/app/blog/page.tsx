import { getBlogPosts } from '@/lib/blog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPage() {
    const posts = getBlogPosts();
  
    return (
      <div className="min-h-screen bg-background text-foreground font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-12">
            <span className="text-primary">&gt; </span>
            System Logs
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 bg-card border-muted cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {post.week}
                      </span>
                      <span>•</span>
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <CardTitle className="text-primary group-hover:text-primary-foreground transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(post.date), 'yyyy-MM-dd')}
                    </div>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {post.excerpt}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  