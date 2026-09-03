export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      author_applications: {
        Row: {
          comments: string | null
          created_at: string
          email: string
          grade: string
          high_school: string
          how_heard: string
          id: string
          introduction: string
          name: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          email: string
          grade: string
          high_school: string
          how_heard: string
          id?: string
          introduction: string
          name: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          email?: string
          grade?: string
          high_school?: string
          how_heard?: string
          id?: string
          introduction?: string
          name?: string
        }
        Relationships: []
      }
      feedback_responses: {
        Row: {
          additional_feedback: string | null
          attending_interest: string
          cant_attend_reason: string | null
          cant_attend_reason_other: string | null
          created_at: string
          id: string
          reschedule_preference: string | null
          topics_interest: string | null
        }
        Insert: {
          additional_feedback?: string | null
          attending_interest: string
          cant_attend_reason?: string | null
          cant_attend_reason_other?: string | null
          created_at?: string
          id?: string
          reschedule_preference?: string | null
          topics_interest?: string | null
        }
        Update: {
          additional_feedback?: string | null
          attending_interest?: string
          cant_attend_reason?: string | null
          cant_attend_reason_other?: string | null
          created_at?: string
          id?: string
          reschedule_preference?: string | null
          topics_interest?: string | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string
          first_name: string
          grade: string
          id: string
          last_name: string
          school_email: string
        }
        Insert: {
          created_at?: string
          first_name: string
          grade: string
          id?: string
          last_name: string
          school_email: string
        }
        Update: {
          created_at?: string
          first_name?: string
          grade?: string
          id?: string
          last_name?: string
          school_email?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      poll_responses: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
        }
        Relationships: []
      }
      qa_questions: {
        Row: {
          created_at: string
          id: string
          likes: number
          question: string
        }
        Insert: {
          created_at?: string
          id?: string
          likes?: number
          question: string
        }
        Update: {
          created_at?: string
          id?: string
          likes?: number
          question?: string
        }
        Relationships: []
      }
      quiz_activity: {
        Row: {
          answered: number
          best_streak: number
          correct_first_try: number
          created_at: string
          device_id: string
          hints_used: number
          id: string
          session_answered: number
          session_first_try: number
          share_stats: boolean
          skipped: number
          streak: number
          unit: string | null
          username: string
          wrong_attempts: number
        }
        Insert: {
          answered?: number
          best_streak?: number
          correct_first_try?: number
          created_at?: string
          device_id: string
          hints_used?: number
          id?: string
          session_answered?: number
          session_first_try?: number
          share_stats?: boolean
          skipped?: number
          streak?: number
          unit?: string | null
          username: string
          wrong_attempts?: number
        }
        Update: {
          answered?: number
          best_streak?: number
          correct_first_try?: number
          created_at?: string
          device_id?: string
          hints_used?: number
          id?: string
          session_answered?: number
          session_first_try?: number
          share_stats?: boolean
          skipped?: number
          streak?: number
          unit?: string | null
          username?: string
          wrong_attempts?: number
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          email: string
          first_name: string
          grade: string
          how_heard: string | null
          id: string
          last_name: string
          parent_email: string | null
          parent_name: string | null
          questions: string | null
          school: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          grade: string
          how_heard?: string | null
          id?: string
          last_name: string
          parent_email?: string | null
          parent_name?: string | null
          questions?: string | null
          school: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          grade?: string
          how_heard?: string | null
          id?: string
          last_name?: string
          parent_email?: string | null
          parent_name?: string | null
          questions?: string | null
          school?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          favorite_lesson: string
          feedback: string
          id: string
          name: string | null
          rating: number
          would_recommend: string
        }
        Insert: {
          created_at?: string
          favorite_lesson: string
          feedback: string
          id?: string
          name?: string | null
          rating: number
          would_recommend: string
        }
        Update: {
          created_at?: string
          favorite_lesson?: string
          feedback?: string
          id?: string
          name?: string | null
          rating?: number
          would_recommend?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_quiz_leaderboard: {
        Args: never
        Returns: {
          answered: number
          best_streak: number
          correct_first_try: number
          last_active: string
          username: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_valid_email: { Args: { _email: string }; Returns: boolean }
      like_qa_question: { Args: { _id: string }; Returns: number }
      unlike_qa_question: { Args: { _id: string }; Returns: number }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
