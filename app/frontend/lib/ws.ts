export function createWishlistSocket(wishlistId: number) {
  const WS_URL =
    process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/wishlists";
  const socket = new WebSocket(`${WS_URL}/${wishlistId}`);

  return socket;
}

