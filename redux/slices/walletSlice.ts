import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "@/utils/helpers/getFromLocalStorage";
import axios from "axios";

interface WalletState {
	balance: number;
	transactions: any[];
}

export interface Transaction {
	id: string;
	amount: number;
	type: "credit" | "debit";
	description: string;
	timestamp: string;
}

const initialState: WalletState = {
	balance: parseFloat(getFromLocalStorage("walletBalance") || "0"),
	transactions: JSON.parse(getFromLocalStorage("walletTransactions") || "[]"),
};

export const getWalletBalance = createAsyncThunk(
	"wallet/getBalance",
	async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/wallet`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"userToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return error.response?.data || "Failed to fetch wallet balance";
		}
	}
);

export const getWalletTransactions = createAsyncThunk(
	"wallet/getTransactions",
	async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/wallet/transactions`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							"userToken"
						)}`,
					},
				}
			);

			return response.data;
		} catch (error: any) {
			return (
				error.response?.data || "Failed to fetch wallet transactions"
			);
		}
	}
);

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setBalance(state, action: PayloadAction<number>) {
			state.balance = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWalletBalance.pending, (state) => {
				state.balance = 0;
			})
			.addCase(getWalletBalance.fulfilled, (state, action) => {
				state.balance = action.payload;
			})
			.addCase(getWalletBalance.rejected, (state) => {
				state.balance = 0;
			})
			.addCase(getWalletTransactions.fulfilled, (state, action) => {
				state.transactions = action.payload;
			})
			.addCase(getWalletTransactions.rejected, (state) => {
				state.transactions = [];
			});
	},
});

export const { setBalance } = walletSlice.actions;
export default walletSlice.reducer;
