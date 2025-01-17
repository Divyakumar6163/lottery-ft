"use client";

import React, { useEffect } from "react";
import CardSlider from "@/components/Home/CardSlider";
import Link from "next/link";
import { FaTrophy, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";
// import Profile from "@/utils/assets/profile.jpg";
// import CardCarousel from "./CardSlider2";
import HowToUse from "./HowToUse";
import LotteryCard from "../TicketCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllLotteries } from "@/redux/slices/lotterySlice";
// import { fetchCityFromCoordinates } from "@/redux/slices/locationSlice";
import { setLoading } from "@/redux/slices/userSlice";
import { fetchStoreByUniqueId } from "@/redux/slices/retailerSlice";
// import { useParams, useSearchParams } from "next/navigation";

const stats = [
	{ label: "Active Players", value: "50,000+", icon: FaUsers },
	{
		label: "Total Prize Pool",
		value: "₹1 Crore+",
		icon: FaMoneyBillWave,
	},
	{ label: "Winners", value: "1000+", icon: FaTrophy },
];

// const allowedStates = ["Maharashtra", "Punjab", "Uttar Pradesh"];

function HomePage({ retailer }: any) {
	const { lotteries } = useSelector(
		(state: RootState) => state.lottery
	) as any;
	const dispatch = useDispatch<AppDispatch>();
	const { authUser, loading } = useSelector((state: RootState) => state.user);
	const { authRetailer } = useSelector((state: RootState) => state.retailer);
	// const { location } = useSelector((state: RootState) => state.location);

	// const query = useSearchParams();
	// console.log("query", query);

	useEffect(() => {
		dispatch(setLoading(true));
		try {
			// const getLocation = async () => {
			// 	if (
			// 		typeof window !== "undefined" &&
			// 		"geolocation" in navigator
			// 	) {
			// 		navigator.geolocation.getCurrentPosition(
			// 			(position) => {
			// 				const { latitude, longitude } = position.coords;
			// 				dispatch(
			// 					fetchCityFromCoordinates({
			// 						latitude,
			// 						longitude,
			// 					})
			// 				);
			// 			},
			// 			() => {
			// 				console.log(
			// 					"Unable to fetch your location. Please enable location access."
			// 				);
			// 			}
			// 		);
			// 	} else {
			// 		console.log(
			// 			"Geolocation is not supported by your browser."
			// 		);
			// 	}
			// };

			// getLocation();
			dispatch(fetchAllLotteries());
			dispatch(fetchStoreByUniqueId(retailer.uniqueId));
		} catch (error) {
			console.log(error);
		}
		dispatch(setLoading(false));
	}, [dispatch]);

	console.log("loading", loading);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				Loading...
			</div>
		);
	}

	// if (!allowedStates.includes(location.state)) {
	// 	return (
	// 		<div className="flex items-center justify-center h-screen">
	// 			<h1 className="text-base md:text-2xl font-bold text-gray-900 px-4 mb-4">
	// 				Sorry, this page is not available in your state.
	// 			</h1>
	// 		</div>
	// 	);
	// }

	return (
		<div
			className={`text-primary w-full min-h-screen overflow-x-hidden ${
				retailer ? "bg-[var(--secondary-color)]" : "bg-gray-100"
			}`}
		>
			<Head>
				<title>
					{retailer
						? `${retailer.brandName} - Online Lottery`
						: "Lotto G - Online Lottery"}
				</title>
				<meta
					name="description"
					content={
						retailer?.customization?.brandingText ||
						"India's Most Trusted Online Lottery Platform"
					}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>

			{/* Hero Section */}
			<div
				className={`relative ${
					retailer
						? "bg-[var(--primary-color)]"
						: "bg-gradient-to-r from-blue-600 to-blue-800"
				} text-white pt-20 pb-12`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative z-10">
						<div className="text-center">
							{retailer && retailer?.logo && (
								<Image
									src={retailer.logo}
									alt={`${retailer.brandName} logo`}
									className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 object-contain"
								/>
							)}
							<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
								{retailer
									? retailer.brandName
									: "Win Big with Lotto G!"}
							</h1>
							<p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100 px-4">
								{retailer?.customization?.brandingText ||
									"India's Most Trusted Online Lottery Platform"}
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
								<Link
									href={authUser ? "/lotteries" : "/login"}
									className="w-full sm:w-auto bg-white text-[var(--primary-color)] py-3 px-8 rounded-full text-base md:text-lg font-semibold hover:bg-opacity-90 transition duration-300"
								>
									{authUser || authRetailer
										? "Buy Tickets"
										: "Login"}
								</Link>
								{/* <Link
									href="/help"
									className="w-full sm:w-auto bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-base md:text-lg font-semibold hover:bg-white/10 transition duration-300"
								>
									How It Works
								</Link> */}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Current Lotteries Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
				<div className="text-center mb-8 md:mb-10">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 px-4">
						Best Sellers
					</h2>
					<p className="text-base md:text-lg text-gray-600 mt-2 px-4">
						Choose from our selection of exciting games
					</p>
				</div>
				<CardSlider affiliate_id={retailer?.uniqueId} />
				{/* <CardCarousel /> */}
			</div>

			{/* Features Section */}
			{/* <div className="bg-white py-12 md:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8 md:mb-12">
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900 px-4">
							Why Choose{" "}
							{retailer ? retailer.brandName : "Lotto G"}?
						</h2>
						<p className="text-base md:text-lg text-gray-600 mt-2 px-4">
							Experience the best in online lottery
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
						<div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
									retailer
										? "bg-[var(--primary-color)]"
										: "bg-blue-100"
								}`}
							>
								<svg
									className={`w-6 h-6 ${
										retailer
											? "text-white"
											: "text-blue-600"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Secure Platform
							</h3>
							<p className="text-gray-600">
								Your security is our top priority. Play with
								peace of mind.
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
									retailer
										? "bg-[var(--primary-color)]"
										: "bg-blue-100"
								}`}
							>
								<svg
									className={`w-6 h-6 ${
										retailer
											? "text-white"
											: "text-blue-600"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Instant Results
							</h3>
							<p className="text-gray-600">
								Get your results immediately after the draw.
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
									retailer
										? "bg-[var(--primary-color)]"
										: "bg-blue-100"
								}`}
							>
								<svg
									className={`w-6 h-6 ${
										retailer
											? "text-white"
											: "text-blue-600"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">
								24/7 Support
							</h3>
							<p className="text-gray-600">
								Our support team is always here to help you.
							</p>
						</div>
					</div>
				</div>
			</div> */}

			{/* Current Lotteries Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
				<div className="text-center mb-8 md:mb-10">
					<h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 px-4">
						Current Lotteries
					</h1>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-4 gap-6 md:gap-8">
						{lotteries?.slice(0, 6).map((lottery: any) => (
							<LotteryCard
								lotteryData={lottery}
								key={lottery._id}
							/>
						))}
					</div>
				</div>
			</div>

			{/* How To Use Section */}
			<HowToUse />

			{/* Stats Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-4 md:mt-4">
				<div className="bg-white rounded-lg shadow-xl p-2 md:p-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
					{stats?.map((stat, index) => (
						<div key={index} className="text-center p-1">
							<div className="flex justify-center mb-3 md:mb-4">
								<stat.icon
									className={`text-2xl md:text-4xl ${
										retailer
											? "text-[var(--primary-color)]"
											: "text-blue-600"
									}`}
								/>
							</div>
							<div className="text-lg md:text-3xl font-bold text-gray-900">
								{stat.value}
							</div>
							<div className="text-sm md:text-base text-gray-500">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-gray-900 text-white pb-16 md:pb-0">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center sm:text-left">
							<h3 className="text-lg font-semibold mb-4">
								About{" "}
								{retailer ? retailer.brandName : "Lotto G"}
							</h3>
							<p className="text-sm md:text-base text-gray-400">
								{retailer?.customization?.brandingText ||
									"India's premier online lottery platform offering secure and exciting gaming experiences."}
							</p>
						</div>
						<div className="text-center sm:text-left">
							<h3 className="text-lg font-semibold mb-4">
								Quick Links
							</h3>
							<ul className="space-y-2 text-sm md:text-base">
								<li>
									<Link
										href="/help"
										className="text-gray-400 hover:text-white block"
									>
										How to Play
									</Link>
								</li>
								<li>
									<Link
										href="/rules"
										className="text-gray-400 hover:text-white block"
									>
										Rules
									</Link>
								</li>
								<li>
									<Link
										href="/winners"
										className="text-gray-400 hover:text-white block"
									>
										Winners
									</Link>
								</li>
							</ul>
						</div>
						<div className="text-center sm:text-left">
							<h3 className="text-lg font-semibold mb-4">
								Support
							</h3>
							<ul className="space-y-2 text-sm md:text-base">
								<li>
									<Link
										href="/faq"
										className="text-gray-400 hover:text-white block"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="text-gray-400 hover:text-white block"
									>
										Contact Us
									</Link>
								</li>
								<li>
									<a
										href="mailto:support@lotto-g.com"
										className="text-gray-400 hover:text-white block"
									>
										support@lotto-g.com
									</a>
								</li>
							</ul>
						</div>
						<div className="text-center sm:text-left">
							<h3 className="text-lg font-semibold mb-4">
								Legal
							</h3>
							<ul className="space-y-2 text-sm md:text-base">
								<li>
									<Link
										href="/privacy"
										className="text-gray-400 hover:text-white block"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-gray-400 hover:text-white block"
									>
										Terms & Conditions
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center">
						<p className="text-sm md:text-base text-gray-400">
							2023 {retailer ? retailer.brandName : "Lotto G"}.
							All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default HomePage;
