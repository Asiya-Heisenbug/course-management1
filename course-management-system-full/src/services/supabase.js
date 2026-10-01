import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfnikkxjyuedozndahdm.supabase.co";
const supabasePublishableKey = "sb_publishable_hKiN3PukBmNC2TpMN7cRHw_JWV3Nh9-";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);