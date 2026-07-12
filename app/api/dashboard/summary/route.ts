import * as productRepository from '@/backend/repositories/product.repository';
import * as orderRepository from '@/backend/repositories/order.repository';
import { NextResponse } from 'next/server';

export async function GET() {
  const totalProducts = await productRepository.getTotalRegisteredProducts();
  const totalOrders = await orderRepository.getTotalRegisteredOrders();
  const totalEarnings = await orderRepository.getTotalEarnings();

  return NextResponse.json({
    totalProducts: totalProducts,
    totalOrders: totalOrders,
    totalEarnings: totalEarnings,
  });
}
