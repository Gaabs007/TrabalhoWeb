import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const generos = await prisma.generos.findMany()
    return Response.json({ message: "OK", generos });
  } catch (err) {
    return NextResponse.json({
      message: "Error", err,
    },
      {
        status: 500,
      })
  }
}

export async function POST(req) {
  const { Nome } = await req.json();
  try {
    const genero = await prisma.generos.create({
      data: {
        Nome,
      },
    });
    return Response.json({ message: "OK", genero })
  } catch (err) {
    return NextResponse.json({
      message: "Error", err,
    },
      {
        status: 500,
      })
  }
}

export async function DELETE(req) {
  const { Id_Genero } = await req.json();
  try {
    const genero = await prisma.generos.delete({
      where: {
        Id_Genero: parseInt(Id_Genero),
      }
    });
    return Response.json({ message: "OK", genero })
  } catch (err) {
    return NextResponse.json({
      message: "Error", err,
    },
      {
        status: 500,
      })
  }
}

export async function PUT(req) {
  const { Id_Genero, Nome } = await req.json();
  try {
    const genero = await prisma.generos.update({
      where: {
        Id_Genero,
      },
      data: {
        Nome,
      },
    });
    return Response.json({ message: "OK", genero })
  } catch (err) {
    return NextResponse.json({
      message: "Error", err,
    },
      {
        status: 500,
      })
  }
}
