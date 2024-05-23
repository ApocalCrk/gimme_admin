export interface Gym {
    id_gym: BigInteger,
    description: string,
    facilities: string,
    name: string,
    location: string,
    image: string,
    packages: string,
    place: string,
    open_close_time: string,
    created_at: Date,
    updated_at: Date,
    [key: string]: unknown
}