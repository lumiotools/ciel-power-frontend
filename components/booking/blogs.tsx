import type React from "react"
import { useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogPost {
  blog_id: string
  title: string
  description: string
  thumbnailLink: string
  pageLink: string
}

interface BlogContentProps {
  blogs: BlogPost[]
}

const BlogContent: React.FC<BlogContentProps> = ({ blogs }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)


   console.log("blog content", blogs)
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // Adjust this value to control scroll distance
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader className="space-y-3">
        <div className="justify-between flex items-center">
          <h3 className="flex items-center text-lg font-medium text-gray-900">
            <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
            Related Blog Posts
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="relative">
        <div className="overflow-hidden" ref={scrollContainerRef}>
          <div className="flex gap-5 min-w-full pb-1">
            {blogs.map((blog) => (
              <div key={blog.blog_id} className="flex-none w-72">
                <div className="group relative">
                  {/* Thumbnail Container */}
                  <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={blog.thumbnailLink }
                      alt={blog.title}
                    className="w-full h-full object-cover"
                    />
                    {/* Read More Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <Link href={blog.pageLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Content Text */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{blog.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{blog.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogContent

