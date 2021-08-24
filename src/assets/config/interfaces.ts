export interface User {
    id : number;
    phone : string;
    date : number;
}

export interface State {
    user: User,
    loading: Boolean,
    categories: any[] | [],
    banners: any[] | [],
    products: any[] | [],
    cart : any[] | [],
    menuOpened: Boolean,
    users : any[] | [],
}

export interface navbarState {
    userSideActive : Boolean
}


export interface bannerState {
    banners : any[] | [],
}

export interface categoryState {
    categories : any[] | [],
}

export interface headquaterState {
    headerquaters : any[] | [],
}

export interface colorState {
    colors : any[] | [],
}


export interface administratorState {
    admins : any[] | []
}

export interface productState {
    products : any[] | [],
}

export interface userState {
    users : any[] | [],
}