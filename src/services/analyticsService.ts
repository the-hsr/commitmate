import * as vscode from "vscode";
import fetch from "node-fetch";
import { GA_MEASUREMENT_ID, GA_API_SECRET } from "../analyticsSecrets";

class AnalyticsService {
  private measurementId = GA_MEASUREMENT_ID;
  private apiSecret = GA_API_SECRET;
  private clientId: string;

  constructor() {
    this.clientId = Math.random().toString(36).substring(2, 15);
  }

  async sendEvent(eventName: string, params: Record<string, any> = {}) {
    const enabled = vscode.workspace.getConfiguration("myExtension").get("enableTelemetry", true);
    if (!enabled) {
        return;
    }

    try {
      const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;
      
      const body = {
        client_id: this.clientId,
        events: [
          {
            name: eventName,
            params: params,
          },
        ],
      };

      await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Analytics error:", error);
    }
  }
}

export const analytics = new AnalyticsService();