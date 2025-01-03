'use client';

import { Terminal, Code2, Brain, Activity, ChevronRight, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterText from "@/components/ui/typewriter-text";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono">
      {/* Navigation */}
      <nav className="border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-cyan-400">
              <div className="inline-block">
                <TypewriterText 
                  texts={[
                    "Initializing system...",
                    "Loading modules...",
                    "System ready."
                  ]} 
                  speed={100} 
                  delayBetweenTexts={1500} 
                />
              </div>
              <div className="text-xl font-bold text-cyan-400 mt-4">
                rich@miles:~$ <span className="animate-blink">|</span>
              </div>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              {['about', 'projects', 'blog', 'contact'].map((item) => (
                <a 
                  key={item}
                  href={`/${item}`} 
                  className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 hover:underline decoration-cyan-500/50"
                >
                  /{item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-900 border-b border-gray-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
              <span className="text-cyan-400">&gt; </span>
              Building Intelligent
              <br />
              <span className="text-cyan-300">Software Solutions_</span>
            </h1>
            <p className="text-xl text-gray-300/80 mb-8 max-w-3xl">
              Crafting secure, intelligent systems at the intersection of code, AI, and human performance.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-cyan-500 text-gray-900 hover:bg-cyan-400">
                View Projects <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                Read Blog
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-cyan-400 mb-12">
          <span className="text-cyan-400">&gt; </span>
          System Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Terminal,
              title: "Software Development",
              desc: "C#/.NET, iOS, React, TypeScript",
              content: "Building robust applications from biotech instruments to mobile apps."
            },
            {
              icon: Brain,
              title: "AI Integration",
              desc: "LLMs, ChatGPT, Claude",
              content: "Leveraging AI for enhanced user experiences and development efficiency."
            },
            {
              icon: Code2,
              title: "Technical Architecture",
              desc: "Cloud, APIs, Security",
              content: "Designing scalable solutions using modern cloud platforms and tools."
            },
            {
              icon: Activity,
              title: "Performance Optimization",
              desc: "Data Analysis, HRV, Metrics",
              content: "Applying data-driven insights to improve human and system performance."
            }
          ].map((item, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 bg-gray-800 border-gray-700"
            >
              <CardHeader>
                <item.icon className="h-8 w-8 mb-4 text-cyan-400" />
                <CardTitle className="text-gray-200">{item.title}</CardTitle>
                <CardDescription className="text-gray-400">{item.desc}</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                {item.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Blog Preview */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-400">
              <span className="text-cyan-400">&gt; </span>
              Latest Logs
            </h2>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              Access Archive
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "iOS Development from a .NET Background",
                week: "Week 2",
                category: "Dev Log",
                content: "Exploring the transition from .NET to iOS development, with insights on leveraging LLMs for learning and productivity."
              },
              {
                title: "Implementing Shamir Secret Sharing",
                week: "Week 3",
                category: "Security",
                content: "A detailed look at implementing Shamir Secret Sharing with the help of LLMs for explanation and verification."
              },
              {
                title: "Auth0 Integration in iOS Apps",
                week: "Week 4",
                category: "Implementation",
                content: "Step-by-step guide to implementing Auth0 in iOS apps, featuring LLM-powered help systems."
              }
            ].map((post, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 bg-gray-800 border-gray-700 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span className="bg-gray-700 text-cyan-300 px-2 py-1 rounded">
                      {post.week}
                    </span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="text-gray-200 group-hover:text-cyan-200 transition-colors duration-200">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400">
                  {post.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                <TypewriterText texts={["[// Connect with the system]"]} speed={100} delayBetweenTexts={1500} />
              </h3>
              <p className="text-gray-400 mb-4">
                Building intelligent software solutions at the intersection of code, innovation, and human performance.
              </p>
              <div className="flex space-x-4">
                <Github className="h-6 w-6 text-gray-400 hover:text-cyan-300 cursor-pointer transition-colors duration-200" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-cyan-300 cursor-pointer transition-colors duration-200" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Navigation</h4>
              <ul className="space-y-2">
                {['About', 'Projects', 'Blog', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors duration-200">
                      /{link.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact</h4>
              <p className="text-gray-400">Initialize new connection...</p>
              <Button className="mt-4 bg-cyan-500 text-gray-900 hover:bg-cyan-400">
                Open Terminal
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <TypewriterText texts={["[System Status: Online] - Last updated: 2024"]} speed={100} delayBetweenTexts={1500} />
          </div>
        </div>
      </footer>
    </div>
  );
}
