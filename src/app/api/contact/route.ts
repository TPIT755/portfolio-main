import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const useResend = process.env.RESEND_API_KEY;

const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
	email: z.string().email("Please enter a valid email address"),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(100, "Subject must be less than 100 characters"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validationResult = contactFormSchema.safeParse(body);

		if (!validationResult.success) {
			const errors = validationResult.error.issues
				.map((err) => `${err.path.join(".")}: ${err.message}`)
				.join(", ");
			return NextResponse.json({ error: `Validation failed: ${errors}` }, { status: 400 });
		}

		const { name, email, subject, message } = validationResult.data;

		console.log("📧 New Contact Form Submission:");
		console.log("Name:", name);
		console.log("Email:", email);
		console.log("Subject:", subject);
		console.log("Message:", message);
		console.log("Timestamp:", new Date().toISOString());
		console.log("---");

		if (useResend) {
			const { Resend } = await import("resend");
			const resend = new Resend(useResend);
			
			console.log("📧 Sending email via Resend...");
			
			const { data, error } = await resend.emails.send({
				from: "TPIT Portfolio <onboarding@resend.dev>",
				to: ["phath321@gmail.com"],
				subject: `[Hỗ trợ] Tin nhắn mới: ${subject}`,
				html: `
					<!DOCTYPE html>
					<html lang="vi">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Yêu cầu hỗ trợ mới</title>
					</head>
					<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb;">
						<table cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 0 auto; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden;">
							<tr>
								<td style="padding: 0;">
									<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
										<tr>
											<td style="padding: 40px 32px; text-align: center;">
												<div style="display: inline-block; width: 56px; height: 56px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin-bottom: 16px; position: relative;">
													<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px;">💬</div>
												</div>
												<h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.025em;">Yêu cầu hỗ trợ mới</h1>
												<p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Bạn vừa nhận được một tin nhắn từ form liên hệ</p>
											</td>
										</tr>
									</table>
									
									<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; padding: 40px 32px 0 32px;">
										<tr>
											<td style="padding: 0;">
												<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #667eea;">
													<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
														<tr>
															<td style="padding: 0 0 16px 0;">
																<div style="display: inline-block; background-color: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Thông tin liên hệ</div>
															</td>
														</tr>
														<tr>
															<td style="padding: 0;">
																<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
																	<tr>
																		<td style="padding: 12px 0; vertical-align: top; width: 100px;">
																			<div style="display: flex; align-items: center; justify-content: flex-start;">
																				<span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
																				<strong style="color: #374151; font-size: 14px; font-weight: 600;">Họ tên</strong>
																			</div>
																		</td>
																		<td style="padding: 12px 0; font-size: 15px; color: #111827; font-weight: 500;">
																			${name}
																		</td>
																	</tr>
																	<tr>
																		<td style="padding: 12px 0; vertical-align: top;">
																			<div style="display: flex; align-items: center; justify-content: flex-start;">
																				<span style="display: inline-block; width: 8px; height: 8px; background-color: #3b82f6; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
																				<strong style="color: #374151; font-size: 14px; font-weight: 600;">Email</strong>
																			</div>
																		</td>
																		<td style="padding: 12px 0; font-size: 15px;">
																			<a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${email}</a>
																		</td>
																	</tr>
																	<tr>
																		<td style="padding: 12px 0; vertical-align: top;">
																			<div style="display: flex; align-items: center; justify-content: flex-start;">
																				<span style="display: inline-block; width: 8px; height: 8px; background-color: #f59e0b; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
																				<strong style="color: #374151; font-size: 14px; font-weight: 600;">Chủ đề</strong>
																			</div>
																		</td>
																		<td style="padding: 12px 0; font-size: 15px; color: #111827; font-weight: 500;">
																			${subject}
																		</td>
																	</tr>
																</table>
														</td>
													</tr>
											</table>
										</div>
									</td>
								</tr>
							</table>
							
							<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; padding: 0 32px;">
								<tr>
									<td style="padding: 0;">
										<div style="background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 28px; position: relative;">
											<div style="position: absolute; top: -12px; left: 24px; background-color: #ffffff; padding: 0 12px; font-size: 12px; font-weight: 700; color: #667eea; text-transform: uppercase; letter-spacing: 0.1em;">Nội dung</div>
											<div style="font-size: 16px; line-height: 1.8; color: #374151; white-space: pre-wrap; margin-top: 8px;">${message}</div>
											</div>
										</td>
									</tr>
							</table>
							
							<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; padding: 40px 32px;">
								<tr>
									<td style="text-align: center;">
										<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb;">
											<div style="display: inline-block; margin-bottom: 8px;">
												<span style="display: inline-block; width: 6px; height: 6px; background-color: #10b981; border-radius: 50%; margin-right: 6px;"></span>
												<span style="font-size: 12px; font-weight: 600; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">Thông báo</span>
											</div>
											<p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
												Tin nhắn này được gửi từ form liên hệ trên portfolio.<br>
												<strong style="color: #374151;">Hãy trả lời trực tiếp email này</strong> để phản hồi ${name}.
											</p>
										</div>
									</td>
								</tr>
							</table>
							
							<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #f8fafc; padding: 24px 32px;">
								<tr>
									<td style="text-align: center;">
										<p style="margin: 0; font-size: 12px; color: #9ca3af;">
											Được gửi từ TPIT Portfolio • ${new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: '2-digit' })}
										</p>
									</td>
								</tr>
							</table>
						</td>
						</tr>
					</table>
					</body>
					</html>
				`,
				replyTo: email,
			});

			if (error) {
				console.error("Resend error:", error);
				return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
			}

			return NextResponse.json({ message: "Email sent successfully", id: data?.id }, { status: 200 });
		}

		return NextResponse.json({ 
			message: "Contact form submitted successfully! I'll get back to you soon.", 
			note: "Email service not configured - message logged to console"
		}, { status: 200 });
		
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}