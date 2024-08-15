import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const DashboardPage = () => {
    return (
        <div className="max-w-md mx-auto">
            <div className="relative p-4 text-white dark:from-purple-400 dark:to-purple-400 bg-gradient-to-b from-green-400 to-green-500 rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                            <AvatarFallback>H</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">Hidaytama</div>
                            <div className="text-sm">+682112235328</div>
                        </div>
                    </div>
                    <Badge variant="secondary">prepaid</Badge>
                </div>
                <div className="mt-4">
                    <div className="text-lg">credit</div>
                    <div className="text-3xl font-bold">Rp234.364</div>
                    <div className="text-sm">ACTIVE TO 27/09/23</div>
                </div>
                <Button variant="default" className="absolute text-white bg-black top-4 right-4">
                    <PlusIcon className="w-4 h-4" /> Top up
                </Button>
            </div>
            <div className="p-4 mt-4 bg-white shadow rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="font-semibold">Internet</div>
                    <div className="text-sm text-muted-foreground">active until 14/09/23</div>
                </div>
                <div className="mt-2">
                    <Progress value={52.35} className="w-full h-2 bg-gray-200" />
                    <div className="flex justify-between mt-2 text-sm">
                        <div>8.9 GB</div>
                        <div>17 GB</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                        <VideoIcon className="w-6 h-6 mx-auto" />
                        <div className="mt-1 text-sm">Streaming</div>
                        <div className="text-xs text-muted-foreground">0.95 MB/7 GB</div>
                    </div>
                    <div>
                        <Music2Icon className="w-6 h-6 mx-auto" />
                        <div className="mt-1 text-sm">TikTok</div>
                        <div className="text-xs text-muted-foreground">2.95 GB/5 GB</div>
                    </div>
                    <div>
                        <MessageSquareIcon className="w-6 h-6 mx-auto" />
                        <div className="mt-1 text-sm">Messages</div>
                        <div className="text-xs text-muted-foreground">5 GB/5 GB</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                <div>
                    <GlobeIcon className="w-8 h-8 mx-auto text-orange-500" />
                    <div className="mt-1 text-sm">Internet</div>
                </div>
                <div>
                    <PlaneIcon className="w-8 h-8 mx-auto text-green-500" />
                    <div className="mt-1 text-sm">Roaming</div>
                </div>
                <div>
                    <VideoIcon className="w-8 h-8 mx-auto text-blue-500" />
                    <div className="mt-1 text-sm">Media</div>
                </div>
                <div>
                    <MessageCircleIcon className="w-8 h-8 mx-auto text-red-500" />
                    <div className="mt-1 text-sm">SMS</div>
                </div>
            </div>
            <div className="p-4 mt-4 bg-white shadow rounded-xl">
                <div className="mb-2 font-semibold">Recent Transaction</div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm">Full Gaming</div>
                        <div className="text-xs text-muted-foreground">12 GB | 30 DAYS</div>
                    </div>
                    <Button variant="outline" className="text-green-500 border-green-500">
                        Buy again
                    </Button>
                </div>
            </div>
            <div className="p-4 mt-4 bg-white shadow rounded-xl">
                <div className="mb-2 font-semibold">Package For you</div>
                <div className="flex space-x-4">
                    <Button variant="secondary" className="flex-1">
                        Best deal
                    </Button>
                    <Button variant="secondary" className="flex-1">
                        Best deal
                    </Button>
                    <Button variant="secondary" className="flex-1">
                        Best deal
                    </Button>
                </div>
            </div>
        </div>
    )
}

function GlobeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}


function MessageCircleIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    )
}


function MessageSquareIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}


function Music2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="18" r="4" />
            <path d="M12 18V2l7 4" />
        </svg>
    )
}


function PlaneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
    )
}


function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}


function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function ShoppingBagIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}


function VideoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    )
}

export default DashboardPage;