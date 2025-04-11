import { Account } from "../components/account/account"
import { AccountProfile } from "../components/account/profile/account-profile"
import { Building } from "../components/account/building/building"
import { SignIn } from "../components/auth/signin"
import { PhotoReport } from "../components/account/photo report/photo-report"
import { Main } from "../components/main/main"
import { ACCOUNT_BUILDING_PAGE, ACCOUNT_COLLATERAL_PAGE, ACCOUNT_DOCUMENTS_PAGE, ACCOUNT_MAIN_PAGE, ACCOUNT_NOTIFICATION_PAGE, ACCOUNT_PAGE, ACCOUNT_PHOTO_REPORT, ACCOUNT_PROFILE_PAGE, ADMIN_BUILDING_PAGE, ADMIN_COLLATERAL_PAGE, ADMIN_PAGE, ADMIN_USER_PAGE, COOKIE_PAGE, MAIN_PAGE, SIGNIN_PAGE } from "../utils/consts"
import { Notification } from "../components/account/notification/notification"
import { AccountMain } from "../components/account/main/account-main"
import { CollateralApplication } from "../components/account/collateral/collateral"
import { Cookie } from "../cookies/cookies"
import { AdminLoyout } from "../components/admin/admin_loyout"
import { AccountDocuments } from "../components/account/documents/documents"
import { AdminUserProfile } from "../components/admin/admin-users/user"
import { CollateralInfo } from "../components/admin/admin-collateral/collateral-info"
import { BuildingInfo } from "../components/admin/admin-building/building-info"




export const publicRoutes = [
    {
        Component: Cookie,
        path: COOKIE_PAGE
    }
]

export const semipublicRoutes = [
    {
        Component: SignIn,
        path: SIGNIN_PAGE
    },
]

export const adminRoutes = [
    {
        Component: Account,
        path: ACCOUNT_PAGE,
        children: [
            {
                Component: AccountMain,
                path: ACCOUNT_MAIN_PAGE
            },
            {
                Component: AccountProfile,
                path: ACCOUNT_PROFILE_PAGE
            },
            // {
            //     Component: Building,
            //     path: ACCOUNT_BUILDING_PAGE
            // },
            {
                Component: PhotoReport,
                path: ACCOUNT_PHOTO_REPORT
            },
            {
                Component: Notification,
                path: ACCOUNT_NOTIFICATION_PAGE
            },
            {
                Component: CollateralApplication,
                path: ACCOUNT_COLLATERAL_PAGE
            },
            {
                Component: AccountDocuments,
                path: ACCOUNT_DOCUMENTS_PAGE
            },
        ]
    },
    {
        Component: AdminLoyout,
        path: ADMIN_PAGE,
        children: []
    },
    {
        Component: AdminUserProfile,
        path: ADMIN_USER_PAGE,
        children: []
    },
    {
        Component: CollateralInfo,
        path: ADMIN_COLLATERAL_PAGE,
        children: []
    },
    {
        Component: BuildingInfo,
        path: ADMIN_BUILDING_PAGE,
        children: []
    }
]

export const builderRoutes = [
    {
        Component: Account,
        path: ACCOUNT_PAGE,
        children: [
            {
                Component: AccountMain,
                path: ACCOUNT_MAIN_PAGE
            },
            {
                Component: AccountProfile,
                path: ACCOUNT_PROFILE_PAGE
            },
            {
                Component: Notification,
                path: ACCOUNT_NOTIFICATION_PAGE
            },
            {
                Component: CollateralApplication,
                path: ACCOUNT_COLLATERAL_PAGE
            },
           
        ]
    },
]

export const clientRoutes = [
    {
        Component: Account,
        path: ACCOUNT_PAGE,
        children: [
            {
                Component: AccountMain,
                path: ACCOUNT_MAIN_PAGE
            },
            {
                Component: AccountProfile,
                path: ACCOUNT_PROFILE_PAGE
            },
            {
                Component: PhotoReport,
                path: ACCOUNT_PHOTO_REPORT
            },
            {
                Component: Notification,
                path: ACCOUNT_NOTIFICATION_PAGE
            },
          
            {
                Component: AccountDocuments,
                path: ACCOUNT_DOCUMENTS_PAGE
            },
        ]
    },
]

