import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const filmes = await prisma.filmes.findMany()
        return Response.json({ message: "OK", filmes });
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
    const { Titulo, Ano, Diretor, Lancamento, Id_Genero } = await req.json();
    try {
        const filme = await prisma.filmes.create({
            data: {
                Titulo,
                Ano: parseInt(Ano),
                Diretor,
                Lancamento: new Date(Lancamento),
                Id_Genero: parseInt(Id_Genero),
            },
        });
        return Response.json({ message: "OK", filme })
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
    const { Id_Filme } = await req.json();
    try {
        const filme = await prisma.filmes.delete({
            where: {
                Id_Filme: parseInt(Id_Filme), 
            }
        });
        return Response.json({ message: "OK", filme })
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
    const { Id_Filme, Titulo, Ano, Diretor, Lancamento, Id_Genero } = await req.json();
    try {
        const filme = await prisma.filmes.update({
            where: {
                Id_Filme,
            },
            data: {
                Titulo,
                Ano: parseInt(Ano),
                Diretor,
                Lancamento: new Date(Lancamento),
                Id_Genero: parseInt(Id_Genero),
            },
        });
        return Response.json({ message: "OK", filme })
    } catch (err) {
        return NextResponse.json({
            message: "Error", err,
        },
            {
                status: 500,
            })
    }
}

