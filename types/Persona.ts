export type Persona = {
  persona_id: string;
  persona_name: string;
  pipeline_mode: string | null;
  system_prompt: string;
  context: string | null;
  layers: string | null;
  default_replica_id: string;
  created_at: string;
  updated_at: string;
};
