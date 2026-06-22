import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box, Flex, VStack, HStack, Heading, Text, Button, IconButton, Input, Textarea, Select,
  Badge, Image, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton,
  useDisclosure, useToast, RadioGroup, Radio, Stack, Spinner, Tag, TagLabel, TagCloseButton, Wrap, WrapItem,
  FormControl, FormLabel, Divider, InputGroup, InputLeftElement, AlertDialog, AlertDialogOverlay,
  AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {
  FiPlus, FiSearch, FiEye, FiEdit2, FiTrash2, FiUpload, FiLogOut, FiCalendar,
} from "react-icons/fi";
import { Logo, Seo } from "../Components/common";
import { ADMIN_PASSWORD, mediaUrl } from "../config";
import {
  getAllBlogsAdmin, createBlog, updateBlog, deleteBlog, uploadImage, toBlogArray,
} from "../api/blogs";
import { formatDate } from "../utils/blog";

const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const EMPTY_FORM = {
  title: "", shortDescription: "", category: "", tags: [], featuredImage: "",
  status: "draft", content: "",
  meta: { metaTitle: "", metaDescription: "", metaKeywords: [], ogType: "article", robots: "index,follow" },
};

/* ---------- Tag input ---------- */
const TagInput = ({ value = [], onChange, placeholder = "Type and press Enter" }) => {
  const [text, setText] = useState("");
  const add = () => {
    const t = text.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setText("");
  };
  return (
    <Box>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); add(); }
        }}
        placeholder={placeholder}
        bg="bg.surface"
        borderColor="border.subtle"
      />
      {value.length > 0 && (
        <Wrap mt={2} spacing={2}>
          {value.map((t) => (
            <WrapItem key={t}>
              <Tag borderRadius="full" bg="rgba(180,160,255,0.14)" color="accent.solid">
                <TagLabel>{t}</TagLabel>
                <TagCloseButton onClick={() => onChange(value.filter((x) => x !== t))} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
};

/* ---------- Password gate ---------- */
const LoginGate = ({ onSuccess }) => {
  const [pw, setPw] = useState("");
  const toast = useToast();
  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) onSuccess();
    else toast({ title: "Incorrect password", status: "error", duration: 2500, position: "top" });
  };
  return (
    <Box minH="100vh" display="grid" placeItems="center" px={5}>
      <Box as="form" onSubmit={submit} bg="bg.canvas" borderRadius="24px" border="1px solid" borderColor="border.subtle" boxShadow="0 40px 80px -24px rgba(0,0,0,0.7)" maxW="420px" w="full" p={{ base: 8, md: 10 }}>
        <VStack spacing={6} align="stretch">
          <VStack spacing={3}>
            <Logo size="lg" to={null} />
            <Text color="text.muted" fontSize="sm">Admin Dashboard</Text>
          </VStack>
          <FormControl>
            <FormLabel fontSize="sm" color="text.muted">Password</FormLabel>
            <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" bg="bg.surface" borderColor="border.subtle" autoFocus />
          </FormControl>
          <Button type="submit" variant="gradient" size="lg" w="full">Enter Dashboard</Button>
        </VStack>
      </Box>
    </Box>
  );
};

/* ---------- Create / Edit drawer ---------- */
const BlogFormDrawer = ({ isOpen, onClose, editing, onSaved }) => {
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setForm(editing ? { ...EMPTY_FORM, ...editing, meta: { ...EMPTY_FORM.meta, ...(editing.meta || {}) } } : EMPTY_FORM);
    }
  }, [isOpen, editing]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setMeta = (k, v) => setForm((f) => ({ ...f, meta: { ...f.meta, [k]: v } }));

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      set("featuredImage", res.imageUrl || res.url || res.path || "");
      toast({ title: "Image uploaded", status: "success", duration: 2000, position: "top" });
    } catch {
      toast({ title: "Upload failed", status: "error", duration: 3000, position: "top" });
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", status: "warning", duration: 2500, position: "top" });
      return;
    }
    setSaving(true);
    try {
      const body = {
        title: form.title,
        shortDescription: form.shortDescription,
        category: form.category,
        tags: form.tags,
        featuredImage: form.featuredImage,
        status: form.status,
        content: form.content,
        meta: form.meta,
      };
      if (editing?._id) await updateBlog(editing._id, body);
      else await createBlog(body);
      toast({ title: editing ? "Blog updated" : "Blog created", status: "success", duration: 2500, position: "top" });
      onSaved();
      onClose();
    } catch {
      toast({ title: "Save failed", description: "Check the API connection and try again.", status: "error", duration: 4000, position: "top" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="right">
      <DrawerOverlay />
      <DrawerContent bg="bg.canvas">
        <DrawerCloseButton mt={2} />
        <DrawerHeader borderBottom="1px solid" borderColor="border.subtle">
          {editing ? "Edit Blog" : "New Blog"}
        </DrawerHeader>
        <DrawerBody py={6}>
          <Box maxW="1100px" mx="auto">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Left column — details */}
              <VStack align="stretch" spacing={5}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Title</FormLabel>
                  <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Blog title" bg="bg.surface" borderColor="border.subtle" />
                  <Text fontSize="xs" color="text.faint" mt={1}>Slug preview: /blog/{slugify(form.slug || form.title) || "…"}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Short description</FormLabel>
                  <Textarea value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} rows={3} placeholder="One or two lines shown on cards" bg="bg.surface" borderColor="border.subtle" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Category</FormLabel>
                  <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. AI, Web, Product" bg="bg.surface" borderColor="border.subtle" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Tags</FormLabel>
                  <TagInput value={form.tags} onChange={(v) => set("tags", v)} />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Featured image</FormLabel>
                  <HStack spacing={4} align="start">
                    <Box w="120px" h="80px" borderRadius="10px" overflow="hidden" border="1px solid" borderColor="border.subtle" bg="bg.surface" flexShrink={0}>
                      {form.featuredImage && <Image src={mediaUrl(form.featuredImage)} alt="" w="full" h="full" objectFit="cover" />}
                    </Box>
                    <VStack align="start" spacing={2}>
                      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
                      <Button size="sm" variant="outlineGlow" leftIcon={<FiUpload />} isLoading={uploading} onClick={() => fileRef.current?.click()}>
                        Upload image
                      </Button>
                      <Input size="sm" value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} placeholder="or paste image URL/path" bg="bg.surface" borderColor="border.subtle" />
                    </VStack>
                  </HStack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Status</FormLabel>
                  <RadioGroup value={form.status} onChange={(v) => set("status", v)}>
                    <Stack direction="row" spacing={6}>
                      <Radio value="draft" colorScheme="purple">Draft</Radio>
                      <Radio value="published" colorScheme="purple">Published</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {/* Meta accordion */}
                <Accordion allowToggle borderRadius="12px" border="1px solid" borderColor="border.subtle">
                  <AccordionItem border="none">
                    <AccordionButton py={3}>
                      <Box flex="1" textAlign="left" fontWeight={600} fontSize="sm">SEO / Meta</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={5}>
                      <VStack align="stretch" spacing={4}>
                        <FormControl>
                          <FormLabel fontSize="sm" mb={1}>Meta title <Text as="span" color="text.faint">({form.meta.metaTitle.length}/60)</Text></FormLabel>
                          <Input maxLength={60} value={form.meta.metaTitle} onChange={(e) => setMeta("metaTitle", e.target.value)} bg="bg.surface" borderColor="border.subtle" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm" mb={1}>Meta description <Text as="span" color="text.faint">({form.meta.metaDescription.length}/160)</Text></FormLabel>
                          <Textarea maxLength={160} rows={2} value={form.meta.metaDescription} onChange={(e) => setMeta("metaDescription", e.target.value)} bg="bg.surface" borderColor="border.subtle" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm">Meta keywords</FormLabel>
                          <TagInput value={form.meta.metaKeywords} onChange={(v) => setMeta("metaKeywords", v)} />
                        </FormControl>
                        <HStack spacing={4} align="start">
                          <FormControl>
                            <FormLabel fontSize="sm">OG type</FormLabel>
                            <Select value={form.meta.ogType} onChange={(e) => setMeta("ogType", e.target.value)} bg="bg.surface" borderColor="border.subtle">
                              <option value="article">article</option>
                              <option value="website">website</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="sm">Robots</FormLabel>
                            <Select value={form.meta.robots} onChange={(e) => setMeta("robots", e.target.value)} bg="bg.surface" borderColor="border.subtle">
                              <option value="index,follow">index,follow</option>
                              <option value="noindex,follow">noindex,follow</option>
                              <option value="noindex,nofollow">noindex,nofollow</option>
                            </Select>
                          </FormControl>
                        </HStack>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </VStack>

              {/* Right column — markdown editor */}
              <FormControl>
                <FormLabel fontSize="sm">Content (Markdown)</FormLabel>
                <Box data-color-mode="dark" borderRadius="12px" overflow="hidden" border="1px solid" borderColor="border.subtle">
                  <MDEditor value={form.content} onChange={(v) => set("content", v || "")} height={560} />
                </Box>
              </FormControl>
            </SimpleGrid>

            <Divider my={6} borderColor="border.subtle" />
            <HStack justify="flex-end" spacing={3}>
              <Button variant="ghostLink" onClick={onClose}>Cancel</Button>
              <Button variant="gradient" isLoading={saving} onClick={save}>
                {editing ? "Save changes" : "Create blog"}
              </Button>
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

/* ---------- Dashboard ---------- */
const Dashboard = ({ onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const load = () => {
    setLoading(true);
    getAllBlogsAdmin()
      .then((d) => setBlogs(toBlogArray(d)))
      .catch(() => toast({ title: "Couldn’t load blogs", description: "Check the API connection.", status: "error", duration: 4000, position: "top" }))
      .finally(() => setLoading(false));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const okStatus = statusFilter === "All" || b.status === statusFilter.toLowerCase();
      const okSearch = !search || b.title?.toLowerCase().includes(search.toLowerCase());
      return okStatus && okSearch;
    });
  }, [blogs, statusFilter, search]);

  const openNew = () => { setEditing(null); onOpen(); };
  const openEdit = (b) => { setEditing(b); onOpen(); };

  const confirmDelete = async () => {
    try {
      await deleteBlog(toDelete._id);
      toast({ title: "Blog deleted", status: "success", duration: 2000, position: "top" });
      setBlogs((prev) => prev.filter((b) => b._id !== toDelete._id));
    } catch {
      toast({ title: "Delete failed", status: "error", duration: 3000, position: "top" });
    } finally {
      setToDelete(null);
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh">
      {/* Sidebar */}
      <Box w={{ base: "full", md: "260px" }} flexShrink={0} borderRight={{ md: "1px solid" }} borderBottom={{ base: "1px solid", md: "none" }} borderColor="border.subtle" p={6} position={{ md: "sticky" }} top={0} h={{ md: "100vh" }}>
        <VStack align="stretch" spacing={6} h="full">
          <Logo size="md" to={null} />
          <HStack justify="space-between">
            <Text fontSize="sm" color="text.muted">All Blogs</Text>
            <Badge borderRadius="full" bg="rgba(180,160,255,0.14)" color="accent.solid" px={2}>{blogs.length}</Badge>
          </HStack>
          <Button variant="gradient" leftIcon={<FiPlus />} onClick={openNew}>New Blog</Button>
          <VStack align="stretch" spacing={1}>
            <Text fontSize="xs" color="text.faint" textTransform="uppercase" letterSpacing="0.1em" mb={1}>Status</Text>
            {["All", "Published", "Draft"].map((s) => (
              <Button key={s} size="sm" justifyContent="flex-start" variant={statusFilter === s ? "outlineGlow" : "ghostLink"} onClick={() => setStatusFilter(s)}>
                {s}
              </Button>
            ))}
          </VStack>
          <Box flex="1" />
          <Button variant="ghostLink" leftIcon={<FiLogOut />} onClick={onLogout} justifyContent="flex-start">Log out</Button>
        </VStack>
      </Box>

      {/* Main */}
      <Box flex="1" p={{ base: 5, md: 8 }} minW={0}>
        <Flex justify="space-between" align="center" mb={6} gap={4} wrap="wrap">
          <Heading fontSize="2xl">Blog Manager</Heading>
          <InputGroup maxW="320px">
            <InputLeftElement pointerEvents="none"><FiSearch color="gray" /></InputLeftElement>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title…" bg="bg.surface" borderColor="border.subtle" />
          </InputGroup>
        </Flex>

        {loading ? (
          <Box py={20} display="grid" placeItems="center"><Spinner size="xl" color="brand.400" emptyColor="border.subtle" /></Box>
        ) : filtered.length === 0 ? (
          <Box py={20} textAlign="center" color="text.faint">No blogs found.</Box>
        ) : (
          <VStack align="stretch" spacing={3}>
            {filtered.map((b) => (
              <Flex key={b._id || b.slug} align="center" gap={4} p={3} borderRadius="14px" border="1px solid" borderColor="border.subtle" bg="bg.surface" _hover={{ borderColor: "rgba(180,160,255,0.3)" }} transition="border-color .2s">
                <Box w="60px" h="40px" borderRadius="8px" overflow="hidden" bg="bg.surface" flexShrink={0}>
                  {b.featuredImage && <Image src={mediaUrl(b.featuredImage)} alt="" w="full" h="full" objectFit="cover" />}
                </Box>
                <Box flex="1" minW={0}>
                  <Text fontWeight={600} noOfLines={1}>{(b.title || "").slice(0, 50)}</Text>
                  <HStack spacing={2} mt={1} color="text.faint" fontSize="xs">
                    {b.category && <Text>{b.category}</Text>}
                    <HStack spacing={1}><FiCalendar size={11} /><Text>{formatDate(b.createdAt)}</Text></HStack>
                  </HStack>
                </Box>
                <Badge borderRadius="full" px={2.5} py={1} textTransform="capitalize" colorScheme={b.status === "published" ? "green" : "yellow"}>
                  {b.status}
                </Badge>
                <HStack spacing={1}>
                  {b.status === "published" && (
                    <IconButton as={Link} to={`/blog/${b.slug}`} target="_blank" aria-label="View" icon={<FiEye />} size="sm" variant="ghost" />
                  )}
                  <IconButton aria-label="Edit" icon={<FiEdit2 />} size="sm" variant="ghost" onClick={() => openEdit(b)} />
                  <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" variant="ghost" colorScheme="red" onClick={() => setToDelete(b)} />
                </HStack>
              </Flex>
            ))}
          </VStack>
        )}
      </Box>

      <BlogFormDrawer isOpen={isOpen} onClose={onClose} editing={editing} onSaved={load} />

      <AlertDialog isOpen={!!toDelete} leastDestructiveRef={cancelRef} onClose={() => setToDelete(null)} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent bg="bg.canvas" border="1px solid" borderColor="border.subtle">
            <AlertDialogHeader>Delete blog</AlertDialogHeader>
            <AlertDialogBody color="text.muted">
              Are you sure you want to delete “{toDelete?.title}”? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} variant="ghostLink" onClick={() => setToDelete(null)}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={confirmDelete}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

const AdminBlogPage = () => {
  const [authed, setAuthed] = useState(false);
  return (
    <Box bg="bg.canvas" minH="100vh">
      <Seo title="Admin" noindex path="/futurise-admin/blog" />
      {authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <LoginGate onSuccess={() => setAuthed(true)} />}
    </Box>
  );
};

export default AdminBlogPage;
