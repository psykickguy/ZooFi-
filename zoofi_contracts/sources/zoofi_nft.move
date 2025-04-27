module zoofi::zoofi_nft {
    use sui::object::UID;
    use sui::tx_context::TxContext;
    use sui::transfer;

    public struct MemeAnimal has key, store {
        id: UID,
        name: vector<u8>,
        meme_level: u64,
    }

    public entry fun mint(name: vector<u8>, meme_level: u64, ctx: &mut TxContext) {
        let id = object::new(ctx); // NO &ctx, just ctx
        let animal = MemeAnimal {
            id,
            name,
            meme_level,
        };
        transfer::public_transfer(animal, tx_context::sender(ctx)); // use public_transfer
    }
}
