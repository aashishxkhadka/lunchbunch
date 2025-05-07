import { Link, useRouter } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isFirst = index === 0

          return (
            <BreadcrumbItem key={href} className={index === 0 ? "hidden md:block" : ""}>
              {!isFirst ? (
                <div className='flex items-center'>
                  <BreadcrumbLink asChild>
                    <Link to={href}>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                </div>
              ) : (
                <div className='flex items-center'>
                  <BreadcrumbPage>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbPage>
                  <BreadcrumbSeparator />
                </div>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

