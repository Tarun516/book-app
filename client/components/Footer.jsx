export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="font-bold text-xl">BookBridge</h3>
                        <p className="text-sm">Connecting book lovers since 2025</p>
                    </div>
                    <div className="text-sm">
                        <p>&copy; {new Date().getFullYear()} BookBridge. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}