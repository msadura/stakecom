import argparse
from substrateinterface import Keypair

def main(seed_hex):
    # Create a Keypair from the seed hex
    keypair = Keypair.create_from_seed(seed_hex)

    # Convert the keys to human-readable hex format
    private_key_hex = keypair.private_key.hex()

    # Print the private key (will be catched by bun)
    print(private_key_hex)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Derive keypair from seed hex.")
    parser.add_argument("seed_hex", type=str, help="The seed hex to derive the keypair from.")

    args = parser.parse_args()
    main(args.seed_hex)