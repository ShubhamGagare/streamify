import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, Music, DollarSign, Award, TrendingUp } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'
import { Badge } from '@/components/ui/badge'

const iconMap = {
  Users,
  UserCheck,
  Music,
  DollarSign,
  Award,
}

interface Metric {
  title: string
  value: string
  icon: keyof typeof iconMap
}

export function KeyMetrics() {
  const { data, loading } = useFetch<Metric[]>('http://localhost:3001/keyMetrics')

  if (loading) return <div>Loading...</div>
  if (!data) return null

  return (
    <>
      {data.map((metric) => {
        const Icon = iconMap[metric.icon]
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.title==="Active Users"?<Badge className='bg-green-200 text-primary rounded-2xl gap-2 p-2 hover:none'> <TrendingUp className="h-4 w-4" /> 10.2%</Badge>:""}
              </div>
              <Icon className=" h-12 w-12 text-yellow-500" />

            </CardContent>
          </Card>
        )
      })}
    </>
  )
}