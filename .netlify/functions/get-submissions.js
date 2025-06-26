// /.netlify/functions/get-submissions.js
exports.handler = async () => {
  const FORM_ID = process.env.FORM_ID;
  const TOKEN   = process.env.ACCESS_TOKEN;

  const api = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`;
  const res = await fetch(api, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });

  const subs = await res.json();

  const formatted = subs.map(s => ({
    name:  s.data["name"]            || "N/A",
    phone: s.data["phone"]           || "N/A",
    photo: (s.data["photo"] && s.data["photo"][0].url) || ""
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(formatted)
  };
};
