import React from 'react'
import { KeyMetrics } from './KeyMetrics'
import { StreamsTable } from './StreamsTable'
import { UserGrowth } from './UserGrowth'
import { RevenueDistribution } from './RevenueDistribution'
import { TopSongs } from './TopSongs'

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen bg-gray-100 overflow-auto">
            <header className="mt-8">
                <div className=" mx-auto py-1 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Welcome back , Shubham</h1>
                </div>
            </header>
            <main>
                <div className=" mx-auto py-4 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                    <div className="mt-8 pb-8">
                            <StreamsTable />
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <KeyMetrics />
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <UserGrowth />
                            <RevenueDistribution />
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <TopSongs />

                        </div>
                       
                    </div>
                </div>
            </main>
        </div>
    )
}