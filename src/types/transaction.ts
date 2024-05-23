export interface Transaction {
    id_transaction: BigInteger,
    uid: BigInteger,
    id_gym: BigInteger,
    payment_method: string,
    payment_amount: number,
    bundle: string,
    type_membership: string,
    created_at: Date,
    updated_at: Date,
    [key: string]: unknown
}