import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Here you would normally send an email or save to a database.
    const carModel = formData.get('car_model');
    // formData.get('date'), formData.get('email')

    // Redirect back to home with a success status
    return NextResponse.redirect(new URL(`/reservation?car=${carModel}&status=success`, req.url), 303);
  } catch (_) {
    return NextResponse.redirect(new URL("/reservation?status=error", req.url), 303);
  }
}
