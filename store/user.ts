
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'
export const useUserStore = defineStore('user', {
    state: () => reactive({
        loginUser: {} as LoginData,
        user: {} as User,
        AccessToken: '' as string,
        RefreshToken: '' as string,
        loggedInEmail: '' as string,
    }),
    actions: {
        // Login user
        async login() {
            try {
                const data = await $fetch('user/user-information', {
                    method: "POST",
                    baseURL: useRuntimeConfig().public.API_URL,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.AccessToken}`,
                    },
                    body: JSON.stringify({
                        email: this.loggedInEmail
                    })
                }) as ApiResponse<LoginData>

                if (data.ApiStatus) {
                    this.loginUser = data.Data
                    this.user = data.Data.user
                }
                console.log(data)
                return data
            } catch (e) {
                console.log(e)
            }

        },
        // Logout user
        logout() {
            this.loginUser = {} as LoginData
            this.user = {} as User
            this.AccessToken = ''
            this.RefreshToken = ''
            this.loggedInEmail = ''
        },
    },
    getters: {
        isLogin(): boolean {
            return this.AccessToken !== '' && this.RefreshToken !== '' && this.loggedInEmail !== ''
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    },
})

export interface ApiResponse<T> {
    ApiStatus: boolean;
    Data: T;
    Message: string;
}

// Interface for user login data
export interface LoginData {
    token: string,
    user: User,
    remainingReimbursementCredit: number,
    monthlyReimbursementPackageCredit: number,
    packageInformation: PackageInformation,
    isLinkAccount: boolean,
    linkAccountParameters: LinkAccountParameters
}

// Interface for loggedin user data
export interface User {
    firstName: string,
    lastName: string,
    email: string,
    countryCode: string,
    callingCode: string,
    telephoneNumber: string,
    isAdmin: string,
    store: Store
}

// Interface for user's store data
export interface Store {
    storeName: string,
    storeId: string,
    evaStoreId: string,
    storeType: number,
    region: string,
    paidStatus: number,
    pricingStatus: number,
    paidDate: string,
    reimbursementPackageTrialEndDate: string,
    linkedDate: string,
    marketplaceName: string,
    marketplaceCode: string,
    enablePricing: boolean,
}

// Interface for user's package information
export interface PackageInformation {
    turnoverPackageInformation: TurnoverPackageInformation,
    skuPackageInformation: SkuPackageInformation
}

// Interface for user's turnover package information
export interface TurnoverPackageInformation {
    pricingStatus: number,
    packageName: string,
    monthlyFee: number,
    lowerLimit: number,
    upperLimit: number,
    reimbursementCredit: number,
}

// Interface for user's sku package information
export interface SkuPackageInformation {
    packageName: string,
    skuChargeFee: number,
}

// Interface for user's link account parameters
export interface LinkAccountParameters {
    developerName: string,
    accountNumber: string,
}