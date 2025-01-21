"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Code2, Users, MessageSquareShare, Video, Github, Terminal, Check, ChevronDown, ChevronUp, Twitter, Linkedin, Facebook, BookOpen, Rocket } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-[#34A85A]" />,
      title: "Collaborative Coding",
      description: "Real-time code editing with syntax highlighting and version control integration"
    },
    {
      icon: <MessageSquareShare className="w-8 h-8 text-[#34A85A]" />,
      title: "Integrated Chat",
      description: "Built-in messaging and thread discussions right next to your code"
    },
    {
      icon: <Video className="w-8 h-8 text-[#34A85A]" />,
      title: "Screen Sharing",
      description: "One-click screen sharing with drawing tools for better explanations"
    },
    {
      icon: <Terminal className="w-8 h-8 text-[#34A85A]" />,
      title: "Remote Terminal",
      description: "Shared terminal sessions for collaborative debugging and deployment"
    },
    {
      icon: <Github className="w-8 h-8 text-[#34A85A]" />,
      title: "Git Integration",
      description: "Seamless Git workflow with built-in conflict resolution"
    },
    {
      icon: <Users className="w-8 h-8 text-[#34A85A]" />,
      title: "Team Management",
      description: "Organize teams, manage permissions, and track progress"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Up to 3 team members",
        "2GB storage",
        "Basic collaboration features",
        "Community support",
        "1 concurrent project"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "per user/month",
      features: [
        "Unlimited team members",
        "50GB storage",
        "Advanced collaboration",
        "Priority support",
        "Unlimited projects",
        "Custom integrations"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Unlimited everything",
        "Dedicated support",
        "Custom security features",
        "On-premise deployment",
        "SLA guarantee",
        "Custom training"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  const integrationSteps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your CodeBurst account and verify your email"
    },
    {
      number: "02",
      title: "Create Team",
      description: "Invite your team members and set up permissions"
    },
    {
      number: "03",
      title: "Connect Repository",
      description: "Link your Git repository to start collaborating"
    },
    {
      number: "04",
      title: "Start Coding",
      description: "Begin coding together in real-time with your team"
    }
  ];

  const faqs = [
    {
      question: "How does real-time collaboration work?",
      answer: "CodeBurst uses operational transformation algorithms to enable multiple developers to edit code simultaneously without conflicts. Changes are synchronized in real-time across all connected users."
    },
    {
      question: "Can I use CodeBurst with my existing Git repositories?",
      answer: "Yes! CodeBurst integrates seamlessly with GitHub, GitLab, and Bitbucket. You can import existing repositories and maintain your current workflow while adding real-time collaboration features."
    },
    {
      question: "Is my code secure?",
      answer: "Absolutely. We use end-to-end encryption for all communications and store your code securely. Our infrastructure is SOC 2 compliant and we regularly undergo security audits."
    },
    {
      question: "What programming languages are supported?",
      answer: "CodeBurst supports all major programming languages with syntax highlighting and language-specific features. This includes but is not limited to JavaScript, Python, Java, C++, Ruby, and Go."
    },
    {
      question: "Can I use CodeBurst offline?",
      answer: "Yes, CodeBurst includes offline support. Changes are synchronized when you reconnect, and you can continue working without an internet connection using our desktop app."
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
              <span className="text-2xl font-bold text-foreground cursor-pointer">CodeBurst</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center space-x-6 ${
              isScrolled ? "text-foreground" : "text-gray-100"
            }`}>
              <Link href="#features" className="hover:text-[#34A85A] transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-[#34A85A] transition-colors">Pricing</Link>
              <Link href="#about" className="hover:text-[#34A85A] transition-colors">About</Link>
              <Link href="/docs" className="flex items-center space-x-1 hover:text-[#34A85A] transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </Link>
              <Link 
                  href="/ide"
                  className="flex items-center space-x-2 bg-[#34A85A] text-white px-4 py-2 rounded-lg hover:bg-[#2d9350] transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  <span> IDE</span>
                </Link>
              <ThemeToggle />
              <SignedIn>
                <Link 
                  href="/ide"
                  className="flex items-center space-x-2 bg-[#34A85A] text-white px-4 py-2 rounded-lg hover:bg-[#2d9350] transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Open IDE</span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              
              <SignedOut>
                <button 
                  onClick={() => router.push('/sign-in')}
                  className="bg-[#34A85A] text-white px-6 py-2 rounded-lg hover:bg-[#2d9350] transition-colors"
                >
                  Login
                </button>
              </SignedOut>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-[#34A85A] transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features" className="block px-3 py-2 text-foreground hover:text-[#34A85A]">Features</Link>
              <Link href="#pricing" className="block px-3 py-2 text-foreground hover:text-[#34A85A]">Pricing</Link>
              <Link href="#about" className="block px-3 py-2 text-foreground hover:text-[#34A85A]">About</Link>
              <Link href="/docs" className="block px-3 py-2 text-foreground hover:text-[#34A85A]">Documentation</Link>
              <SignedIn>
                <Link 
                  href="/ide"
                  className="block px-3 py-2 text-[#34A85A]"
                >
                  Open IDE
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <button 
                  onClick={() => router.push('/sign-in')}
                  className="w-full text-left px-3 py-2 text-[#34A85A]"
                >
                  Login
                </button>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center bg-gradient-to-b from-background to-background dark:from-gray-900 dark:to-background"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Remote Work Collaboration Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Unite your development workflow with integrated coding, communication, and collaboration tools.
          </p>
          <button 
            onClick={() => router.push('/sign-up')}
            className="bg-[#34A85A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#2d9350] transform hover:scale-105 transition-all duration-300"
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaborative Features Showcase */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Code Together, Deploy Faster
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience seamless collaboration with real-time code editing, integrated chat, and one-click deployments. Our platform brings your team together, making remote development feel like you're all in the same room.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-[#34A85A] mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Collaboration</h3>
                    <p className="text-muted-foreground">Multiple developers can edit code simultaneously with live updates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-[#34A85A] mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Integrated Communication</h3>
                    <p className="text-muted-foreground">Built-in chat and video calls right next to your code</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-[#34A85A] mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">One-Click Deployment</h3>
                    <p className="text-muted-foreground">Deploy your applications with a single click to any cloud provider</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80"
                alt="Collaborative Coding"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">3 developers online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Steps Section */}
      <div className="py-20 bg-muted" id="integration">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Get Started in Minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#34A85A] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-background" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card p-8 rounded-lg shadow-md ${
                  plan.popular ? 'border-2 border-[#34A85A] relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#34A85A] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted-foreground">
                      <Check className="w-5 h-5 text-[#34A85A] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push('/sign-up')}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-[#34A85A] text-white hover:bg-[#2d9350]'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-muted" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50"
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 text-muted-foreground border-t">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">CodeBurst</h3>
              <p className="text-muted-foreground">
                Empowering developers to collaborate and build amazing things together.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-[#34A85A]">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-[#34A85A]">Pricing</Link></li>
                <li><Link href="/docs" className="text-muted-foreground hover:text-[#34A85A]">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-muted-foreground hover:text-[#34A85A]">About</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-[#34A85A]">Blog</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-[#34A85A]">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-[#34A85A]">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#34A85A]">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#34A85A]">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#34A85A]">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CodeBurst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}