export default function handler(req, res) {
  if (req.method === "POST") {
    const { coursework } = req.body;

    // Simulate evaluation process
    const evaluationResult = {
      overallScore: Math.floor(Math.random() * 100),
      criteriaScores: {
        A: Math.floor(Math.random() * 10),
        B: Math.floor(Math.random() * 10),
        C: Math.floor(Math.random() * 10),
      },
      evaluationDate: new Date().toISOString(),
    };

    res.status(200).json({ evaluationResult });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
