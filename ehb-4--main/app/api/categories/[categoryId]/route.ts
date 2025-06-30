import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const { name, description, parentId } = data;
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const updateData: any = {
      name,
      description: description || '',
      updatedAt: new Date(),
    };
    if (parentId) updateData.parentId = new ObjectId(parentId);
    await db.collection('categories').updateOne(
      { _id: new ObjectId(params.categoryId) },
      { $set: updateData }
    );
    const updated = await db.collection('categories').findOne({ _id: new ObjectId(params.categoryId) });
    return NextResponse.json({ message: 'Category updated', category: updated });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(params.categoryId) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
} 