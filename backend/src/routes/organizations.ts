import { FastifyInstance } from 'fastify';
import { validateParams, schemas } from '@/middleware/validation';
import { supabase } from '@/services/database';
import { NotFoundError } from '@/types';

export async function organizationRoutes(fastify: FastifyInstance) {
  // Get organization by ID (public)
  fastify.get('/:id', {
    preHandler: [validateParams(schemas.uuidParam)]
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const { data: organization, error } = await supabase
      .from('organizations')
      .select(`
        id,
        name,
        logo_url,
        website,
        created_at
      `)
      .eq('id', id)
      .single();

    if (error || !organization) {
      throw new NotFoundError('Organization not found');
    }

    return reply.send({
      success: true,
      data: organization
    });
  });

  // Get organizations list (public, with pagination)
  fastify.get('/', async (request, reply) => {
    const query = request.query as { limit?: string; offset?: string; search?: string };
    const limit = parseInt(query.limit || '20');
    const offset = parseInt(query.offset || '0');
    const search = query.search;

    let dbQuery = supabase
      .from('organizations')
      .select(`
        id,
        name,
        logo_url,
        website,
        created_at
      `)
      .order('name');

    if (search) {
      dbQuery = dbQuery.ilike('name', `%${search}%`);
    }

    // Get total count
    const { count } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true });

    // Apply pagination
    const { data: organizations, error } = await dbQuery
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error('Failed to fetch organizations');
    }

    return reply.send({
      success: true,
      data: organizations,
      pagination: {
        total: count || 0,
        limit,
        offset,
        has_more: (count || 0) > offset + limit
      }
    });
  });
}
