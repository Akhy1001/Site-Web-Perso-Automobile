import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const _formData = await req.formData();
    
    // Here you would normally send an email or save to a database.
    // formData.get('name'), formData.get('email'), formData.get('message')

    // Redirect back to home with a success status
    // 303 See Other is correct for POST-Redirect-GET pattern
    return NextResponse.redirect(new URL("/?status=success", req.url), 303);
  } catch (_) {
    return NextResponse.redirect(new URL("/?status=error", req.url), 303);
  }
}
