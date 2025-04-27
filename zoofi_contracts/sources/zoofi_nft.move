module zoofi::zoofi_nft {
    use sui::object::{UID};
    use sui::tx_context::{TxContext};
    use sui::coin::{Self, TreasuryCap, Coin};
    use sui::sui::SUI;
    use sui::transfer;

    public struct MemeAnimal has key, store {
        id: UID,
        name: vector<u8>,
        meme_level: u64,
    }

    public entry fun mint_nft(name: vector<u8>, meme_level: u64, ctx: &mut TxContext) {
        let id = object::new(ctx);
        let animal = MemeAnimal { id, name, meme_level };
        transfer::public_transfer(animal, tx_context::sender(ctx));
    }

    public entry fun mint_token(
        cap: &mut TreasuryCap<Coin<SUI>>,
        receiver: address,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let coin = coin::mint(cap, amount, ctx);
        transfer::public_transfer(coin, receiver);
    }
}
