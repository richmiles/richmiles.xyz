import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './types';

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export function getBlogPosts(): BlogPost[] {
  const posts = fs.readdirSync(POSTS_PATH);
  
  return posts
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt,
        category: data.category,
        week: data.week,
        readingTime: `${Math.ceil(content.split(' ').length / 200)} min read`
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt: data.excerpt,
      category: data.category,
      week: data.week,
      readingTime: `${Math.ceil(content.split(' ').length / 200)} min read`
    };
  } catch {
    return null;
  }
}